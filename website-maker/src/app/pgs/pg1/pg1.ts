import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../services/auth.models';

@Component({
  selector: 'app-pg1',
  imports: [FormsModule, CommonModule],
  templateUrl: './pg1.html',
  styleUrl: './pg1.css'
})
export class Pg1 {
  imageUrl = 'assets/p2.jpg';
  
  loginData: LoginRequest = {
    username: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    if (!this.loginData.username || !this.loginData.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          if (response.token) {
            this.authService.setToken(response.token);
          }
          console.log('Login successful:', response.user);
          // Navigate to dashboard or home page
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Login failed. Please try again.';
        console.error('Login error:', error);
      }
    });
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
  
  goToRegister(){
    this.router.navigate(['/register']);
  }
}
