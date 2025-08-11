import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../services/auth.models';

@Component({
  selector: 'app-pg3',
  imports: [FormsModule, CommonModule],
  templateUrl: './pg3.html',
  styleUrl: './pg3.css'
})
export class Pg3 {
  imageUrl = 'assets/p1.jpeg';

  registerData: RegisterRequest = {
    fullName: '',
    email: '',
    dateOfBirth: '',
    username: '',
    password: '',
    confirmPassword: ''
  };

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router, private authService: AuthService) {}

  onRegister() {
    // Reset messages
    this.errorMessage = '';
    this.successMessage = '';

    // Basic validation
    if (!this.registerData.fullName || !this.registerData.email || 
        !this.registerData.dateOfBirth || !this.registerData.username || 
        !this.registerData.password || !this.registerData.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.registerData.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    this.isLoading = true;

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.successMessage = response.message;
          console.log('Registration successful:', response.user);
          // Redirect to login after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration error:', error);
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
