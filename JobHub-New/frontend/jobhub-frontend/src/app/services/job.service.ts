import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Job {
  id?: number;
  title: string;
  description: string;
  company: string;
  location: string;
  salary_min: number;
  salary_max: number;
  job_type: 'full_time' | 'part_time' | 'internship';
  is_active: boolean;
  category: number;
  category_name?: string;
  employer?: number;
  employer_name?: string;
  created_at?: string;
}

export interface Application {
  id: number;
  job_id: number;
  job_title: string;
  cover_letter: string;
  status: 'pending' | 'accepted' | 'rejected';
  applied_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs/`);
  }

  getJob(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/jobs/${id}/`);
  }

  createJob(job: Job): Observable<Job> {
    console.log('Creating job:', job);
    return this.http.post<Job>(`${this.apiUrl}/jobs/`, job);
  }

  updateJob(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/jobs/${id}/`, job);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/jobs/${id}/`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories/`);
  }

  getMyApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/applications/`);
  }

  applyToJob(jobId: number, coverLetter: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/applications/`, { job_id: jobId, cover_letter: coverLetter });
  }
}
