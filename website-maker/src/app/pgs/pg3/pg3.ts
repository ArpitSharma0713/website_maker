import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pg3',
  imports: [],
  templateUrl: './pg3.html',
  styleUrl: './pg3.css'
})
export class Pg3 {
  imageUrl = 'assets/p1.jpeg';

  constructor(private router: Router) {}

  onRegister() {
    console.log('Registration attempted');
    // Add registration logic here
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
