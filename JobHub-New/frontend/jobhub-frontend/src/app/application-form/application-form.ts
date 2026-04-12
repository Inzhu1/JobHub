import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService, Job } from '../services/job.service';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './application-form.html',
  styleUrls: ['./application-form.css']
})
export class ApplicationFormComponent implements OnInit {
  jobId: number | null = null;
  job: Job | null = null;
  coverLetter = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.params['jobId'];
    if (this.jobId) {
      this.loadJob();
    }
  }

  loadJob(): void {
    this.jobService.getJob(this.jobId!).subscribe({
      next: (data) => {
        this.job = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load job details';
      }
    });
  }

  onSubmit(): void {
    if (!this.jobId) return;

    this.jobService.applyToJob(this.jobId, this.coverLetter).subscribe({
      next: () => {
        this.successMessage = 'Application submitted successfully!';
        setTimeout(() => {
          this.router.navigate(['/jobs']);
        }, 2000);
      },
      error: (error) => {
        if (error.status === 400) {
          this.errorMessage = 'You have already applied for this job';
        } else {
          this.errorMessage = 'Failed to submit application';
        }
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/jobs']);
  }
}
