import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { Head } from './head/head';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Home,Head],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'website-maker';
}
