import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  role: 'employer' | 'seeker' = 'seeker';
  company_name = '';
  phone = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      company_name: this.company_name,
      phone: this.phone
    };

    this.authService.register(userData).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Please login.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = error.error?.username?.[0] || 'Registration failed. Please try again.';
      }
    });
  }
}
