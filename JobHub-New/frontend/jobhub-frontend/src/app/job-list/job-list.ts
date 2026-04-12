import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JobService, Job } from '../services/job.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-list.html',
  styleUrls: ['./job-list.css']
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private jobService: JobService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.loading = true;
    this.jobService.getJobs().subscribe({
      next: (data) => {
        this.jobs = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load jobs';
        this.loading = false;
      }
    });
  }

  getRole(): string | null {
    return this.authService.getRole();
  }

  applyToJob(jobId: number): void {
    this.router.navigate(['/apply', jobId]);
  }

  editJob(jobId: number): void {
    this.router.navigate(['/jobs/edit', jobId]);
  }

  deleteJob(jobId: number): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJob(jobId).subscribe({
        next: () => {
          this.jobs = this.jobs.filter(job => job.id !== jobId);
        },
        error: () => {
          this.errorMessage = 'Failed to delete job';
        }
      });
    }
  }

  createJob(): void {
    this.router.navigate(['/jobs/new']);
  }
}
