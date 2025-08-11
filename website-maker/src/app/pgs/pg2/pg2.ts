import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pg2',
  imports: [],
  templateUrl: './pg2.html',
  styleUrl: './pg2.css'
})
export class Pg2 {

  constructor(private router: Router) {}

  onResetPassword() {
    // Add your reset password logic here
    console.log('Reset password attempted');
  }

  goBackToLogin() {
    this.router.navigate(['/login']);
  }
}
