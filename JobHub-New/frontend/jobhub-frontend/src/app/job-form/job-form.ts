import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService, Job, Category } from '../services/job.service';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-form.html',
  styleUrls: ['./job-form.css']
})
export class JobFormComponent implements OnInit {
  job: Job = {
    title: '',
    description: '',
    company: '',
    location: '',
    salary_min: 0,
    salary_max: 0,
    job_type: 'full_time',
    is_active: true,
    category: 1
  };
  categories: Category[] = [];
  isEditMode = false;
  jobId: number | null = null;
  errorMessage = '';
  successMessage = '';

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('JobFormComponent initialized');
    this.loadCategories();
    
    this.jobId = this.route.snapshot.params['id'];
    console.log('Job ID:', this.jobId);
    if (this.jobId) {
      this.isEditMode = true;
      this.loadJob(this.jobId);
    }
  }

  loadCategories(): void {
    console.log('Loading categories...');
    this.jobService.getCategories().subscribe({
      next: (data) => {
        console.log('Categories loaded:', data);
        this.categories = data;
        if (data.length > 0) {
          this.job.category = data[0].id;
        }
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.errorMessage = 'Failed to load categories';
      }
    });
  }

  loadJob(id: number): void {
    this.jobService.getJob(id).subscribe({
      next: (data) => {
        this.job = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load job';
      }
    });
  }

  onSubmit(): void {
    console.log('Submitting form...', this.job);
    if (this.isEditMode && this.jobId) {
      this.jobService.updateJob(this.jobId, this.job).subscribe({
        next: () => {
          this.successMessage = 'Job updated successfully!';
          setTimeout(() => {
            this.goBack();
          }, 2000);
        },
        error: (err) => {
          console.error('Error updating job:', err);
          this.errorMessage = 'Failed to update job';
        }
      });
    } else {
      this.jobService.createJob(this.job).subscribe({
        next: () => {
          this.successMessage = 'Job created successfully!';
          setTimeout(() => {
            this.goBack();
          }, 2000);
        },
        error: (err) => {
          console.error('Error creating job:', err);
          this.errorMessage = 'Failed to create job';
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/jobs']);
  }
}
