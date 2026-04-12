from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Custom Manager (требование в задании)
class ActiveJobManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    
    def __str__(self):
        return self.name

class Job(models.Model):
    JOB_TYPES = (
        ('full_time', 'Full Time'),
        ('part_time', 'Part Time'),
        ('internship', 'Internship'),
    )
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    salary_min = models.IntegerField()
    salary_max = models.IntegerField()
    job_type = models.CharField(max_length=20, choices=JOB_TYPES)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # ForeignKey #1
    employer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='jobs')
    # ForeignKey #2
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='jobs')
    
    # Используем custom manager
    objects = ActiveJobManager()
    all_objects = models.Manager()  # чтобы получить все объекты если нужно
    
    def __str__(self):
        return self.title

class Application(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    )
    
    # ForeignKey #3
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    # ForeignKey #4
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    
    cover_letter = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    applied_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('applicant', 'job')
    
    def __str__(self):
        return f"{self.applicant.username} -> {self.job.title}"