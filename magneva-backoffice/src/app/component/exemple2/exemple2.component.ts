import { Component, OnInit } from '@angular/core';
import { BodyComponent } from '../body/body.component';

@Component({
  selector: 'app-exemple2',
  standalone: true,
  imports: [],
  templateUrl: './exemple2.component.html',
  styleUrl: './exemple2.component.css'
})
export class Exemple2Component extends BodyComponent {
  
  override title = "Exemple 2";

}
