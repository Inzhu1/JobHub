from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('employer', 'Employer'),
        ('seeker', 'Job Seeker'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='seeker')
    company_name = models.CharField(max_length=200, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True)
    
    def __str__(self):
        return f"{self.username} ({self.role})"