import { Component, OnInit } from '@angular/core';
import { BodyComponent } from '../body/body.component';

@Component({
  selector: 'app-exemple1',
  standalone: true,
  imports: [],
  templateUrl: './exemple1.component.html',
  styleUrl: './exemple1.component.css'
})

export class Exemple1Component extends BodyComponent {

  override title = "Exemple 1";

}
