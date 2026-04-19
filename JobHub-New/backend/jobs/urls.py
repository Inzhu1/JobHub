from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('categories/', views.category_list, name='categories'),
    path('jobs/', views.JobListCreateView.as_view(), name='job-list-create'),
    path('jobs/<int:pk>/', views.JobDetailView.as_view(), name='job-detail'),
    path('applications/', views.ApplicationCreateView.as_view(), name='applications'),
    path('users/me/', views.CurrentUserView.as_view(), name='current-user'),
    path('employer/applications/', views.EmployerApplicationsView.as_view(), name='employer-applications'),
    path('applications/<int:application_id>/status/', views.UpdateApplicationStatusView.as_view(), name='update-application-status'),
]
