import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-employer-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employer-applications.html',
  styleUrls: ['./employer-applications.css']
})
export class EmployerApplicationsComponent implements OnInit {
  applications: any[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;
    const token = this.authService.getToken();
    
    this.http.get('http://localhost:8000/api/employer/applications/', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: (data: any) => {
        this.applications = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load applications';
        this.loading = false;
      }
    });
  }

  updateStatus(applicationId: number, newStatus: string): void {
    this.jobService.updateApplicationStatus(applicationId, newStatus).subscribe({
      next: (response: any) => {
        this.successMessage = response.message;
        // Обновляем статус в локальном списке
        const app = this.applications.find(a => a.id === applicationId);
        if (app) {
          app.status = newStatus;
        }
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err: any) => {
        this.errorMessage = err.error?.error || 'Failed to update status';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
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
      case 'accepted': return '✅ Accepted';
      case 'rejected': return '❌ Rejected';
      case 'interview': return '📅 Interview Scheduled';
      default: return '⏳ Pending';
    }
  }
}
