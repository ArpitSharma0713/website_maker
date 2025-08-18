import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pg4-header',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pg4-header.html',
  styleUrl: './pg4-header.css'
})
export class Pg4Header {
  constructor(private router: Router) {}
  onLinkClick(link: string) {
    if(link=="Link 1") {
      this.router.navigate(['/login']);
    } else if(link=="Link 2") {
      this.router.navigate(['/register']);
    } else if(link=="Link 3") {
      this.router.navigate(['/Home']);
    }
  }

}
