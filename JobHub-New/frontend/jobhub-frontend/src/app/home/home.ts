import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  searchQuery = '';
  
  categories = [
    { name: 'Technology', icon: '💻', count: 124 },
    { name: 'Marketing', icon: '📢', count: 87 },
    { name: 'Design', icon: '🎨', count: 56 },
    { name: 'Finance', icon: '💰', count: 43 },
    { name: 'Sales', icon: '📈', count: 92 },
    { name: 'Internship', icon: '🎓', count: 156 }
  ];
  
  featuredJobs = [
    { title: 'Frontend Developer', company: 'Google', location: 'Mountain View, CA', salary: '$120k - $180k', type: 'Full Time' },
    { title: 'UI/UX Designer', company: 'Meta', location: 'Remote', salary: '$100k - $150k', type: 'Full Time' },
    { title: 'Marketing Intern', company: 'Amazon', location: 'Seattle, WA', salary: '$30/hr', type: 'Internship' }
  ];
}
