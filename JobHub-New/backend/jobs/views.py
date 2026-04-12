from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Job, Category, Application
from .serializers import JobSerializer, CategorySerializer, ApplicationSerializer, UserSerializer

# ========== FBV #1: Регистрация ==========
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ========== FBV #2: Список категорий ==========
@api_view(['GET'])
@permission_classes([AllowAny])
def category_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

# ========== CBV #1: CRUD для вакансий ==========
class JobListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        jobs = Job.objects.all()
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(employer=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JobDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get_object(self, pk):
        return get_object_or_404(Job, pk=pk)
    
    def get(self, request, pk):
        job = self.get_object(pk)
        serializer = JobSerializer(job)
        return Response(serializer.data)
    
    def put(self, request, pk):
        job = self.get_object(pk)
        if job.employer != request.user:
            return Response({"error": "You can only edit your own jobs"}, status=status.HTTP_403_FORBIDDEN)
        serializer = JobSerializer(job, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        job = self.get_object(pk)
        if job.employer != request.user:
            return Response({"error": "You can only delete your own jobs"}, status=status.HTTP_403_FORBIDDEN)
        job.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ========== CBV #2: Отклики ==========
class ApplicationCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = ApplicationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            application = serializer.save()
            return Response({
                'id': application.id,
                'job_id': application.job.id,
                'status': application.status,
                'applied_at': application.applied_at
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        applications = Application.objects.filter(applicant=request.user)
        data = []
        for a in applications:
            data.append({
                'id': a.id,
                'job_id': a.job.id,
                'job_title': a.job.title,
                'status': a.status,
                'applied_at': a.applied_at
            })
        return Response(data)
# ========== Get Current User Info ==========
class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role,
            'company_name': user.company_name,
            'phone': user.phone
        })

# ========== Employer View Applications ==========
class EmployerApplicationsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Проверяем что пользователь - работодатель
        if request.user.role != 'employer':
            return Response({"error": "Only employers can view applications"}, status=status.HTTP_403_FORBIDDEN)
        
        # Получаем все вакансии работодателя
        jobs = Job.objects.filter(employer=request.user)
        
        # Собираем отклики на эти вакансии
        applications = []
        for job in jobs:
            for app in job.applications.all():
                applications.append({
                    'id': app.id,
                    'job_title': job.title,
                    'applicant_name': app.applicant.username,
                    'applicant_email': app.applicant.email,
                    'applicant_phone': app.applicant.phone,
                    'cover_letter': app.cover_letter,
                    'status': app.status,
                    'applied_at': app.applied_at
                })
        
        return Response(applications)
