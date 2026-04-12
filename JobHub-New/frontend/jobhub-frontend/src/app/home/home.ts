import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobService, Job, Category } from '../services/job.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  searchQuery = '';
  filteredJobs: Job[] = [];
  allJobs: Job[] = [];
  categories: Category[] = [];
  selectedCategory: string = '';
  
  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
    this.loadCategories();
  }

  loadJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (data) => {
        this.allJobs = data;
        this.filteredJobs = data;
      },
      error: (err) => {
        console.error('Error loading jobs:', err);
      }
    });
  }

  loadCategories(): void {
    this.jobService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  searchJobs(): void {
    let results = this.allJobs;
    
    // Поиск по тексту
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query)
      );
    }
    
    // Фильтр по категории
    if (this.selectedCategory) {
      results = results.filter(job => job.category_name === this.selectedCategory);
    }
    
    this.filteredJobs = results;
  }

  filterByCategory(categoryName: string): void {
    this.selectedCategory = categoryName;
    this.searchJobs();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.filteredJobs = this.allJobs;
  }
}
