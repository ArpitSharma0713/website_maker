import { Component } from '@angular/core';
import { Pg4Home } from '../../components/pg4-home/pg4-home';
import { Pg4Header } from '../../components/pg4-header/pg4-header';

@Component({
  selector: 'app-pg4',
  imports: [Pg4Home,Pg4Header],
  templateUrl: './pg4.html',
  styleUrl: './pg4.css'
})
export class Pg4 {

}
