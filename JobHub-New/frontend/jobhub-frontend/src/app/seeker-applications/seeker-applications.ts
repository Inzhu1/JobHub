import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-seeker-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seeker-applications.html',
  styleUrls: ['./seeker-applications.css']
})
export class SeekerApplicationsComponent implements OnInit {
  applications: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;
    const token = this.authService.getToken();
    
    this.http.get('http://localhost:8000/api/applications/', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: (data: any) => {
        this.applications = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load your applications';
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'accepted': return 'status-accepted';
      case 'rejected': return 'status-rejected';
      case 'interview': return 'status-interview';
      default: return 'status-pending';
    }
  }

  getStatusText(status: string): string {
    switch(status) {
      case 'accepted': return '✅ Accepted! 🎉';
      case 'rejected': return '❌ Rejected';
      case 'interview': return '📅 Interview Scheduled';
      default: return '⏳ Pending Review';
    }
  }

  getStatusIcon(status: string): string {
    switch(status) {
      case 'accepted': return '🎉';
      case 'rejected': return '😔';
      case 'interview': return '📅';
      default: return '⏳';
    }
  }
}
