import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pg1',
  imports: [],
  templateUrl: './pg1.html',
  styleUrl: './pg1.css'
})
export class Pg1 {
  imageUrl = 'assets/p2.jpg';

  constructor(private router: Router) {}

  onLogin() {
    console.log('Login attempted');

  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
  goToRegister(){
    this.router.navigate(['/register']);
  }
}
