from rest_framework import serializers
from .models import Category, Job, Application
from django.contrib.auth import get_user_model

User = get_user_model()

class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)
    slug = serializers.SlugField()
    
    def create(self, validated_data):
        return Category.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.slug = validated_data.get('slug', instance.slug)
        instance.save()
        return instance

class JobSerializer(serializers.ModelSerializer):
    employer_name = serializers.ReadOnlyField(source='employer.username')
    category_name = serializers.ReadOnlyField(source='category.name')
    
    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ('employer', 'created_at')

class ApplicationSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    job_id = serializers.IntegerField()
    cover_letter = serializers.CharField(required=False, allow_blank=True)
    status = serializers.CharField(read_only=True)
    applied_at = serializers.DateTimeField(read_only=True)
    
    def validate_job_id(self, value):
        if not Job.objects.filter(id=value).exists():
            raise serializers.ValidationError("Job does not exist")
        return value
    
    def create(self, validated_data):
        job = Job.objects.get(id=validated_data['job_id'])
        user = self.context['request'].user
        return Application.objects.create(applicant=user, job=job, cover_letter=validated_data.get('cover_letter', ''))

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'role', 'company_name', 'phone')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
