import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

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

  constructor(private http: HttpClient, private authService: AuthService) {}

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
      error: (error) => {
        this.errorMessage = 'Failed to load applications';
        this.loading = false;
      }
    });
  }
}
