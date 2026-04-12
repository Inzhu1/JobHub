import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // После успешного логина получаем информацию о пользователе
        this.authService.getUserInfo().subscribe({
          next: (userInfo: any) => {
            const user: User = {
              id: userInfo.id,
              username: userInfo.username,
              email: userInfo.email,
              role: userInfo.role,
              company_name: userInfo.company_name,
              phone: userInfo.phone
            };
            this.authService.saveUser(user);
            this.router.navigate(['/jobs']);
          },
          error: () => {
            // Если не получили информацию о пользователе, используем fallback
            const role = this.username.includes('employer') ? 'employer' : 'seeker';
            const user: User = { 
              id: 0,
              username: this.username, 
              email: '',
              role: role as 'employer' | 'seeker'
            };
            this.authService.saveUser(user);
            this.router.navigate(['/jobs']);
          }
        });
      },
      error: (error) => {
        this.errorMessage = 'Invalid username or password';
        this.loading = false;
      }
    });
  }
}
