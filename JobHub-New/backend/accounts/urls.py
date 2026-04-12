from django.urls import path
from jobs.views import register

urlpatterns = [
    path('', register, name='register'),
]