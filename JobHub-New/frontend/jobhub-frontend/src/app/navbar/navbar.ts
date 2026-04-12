import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getRole(): string | null {
    return this.authService.getRole();
  }

  getUsername(): string {
    const user = this.authService.getUser();
    return user ? user.username : '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
