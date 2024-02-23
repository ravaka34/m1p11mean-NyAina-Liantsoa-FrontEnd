import { Component, OnInit } from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exemple1',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './exemple1.component.html',
  styleUrl: './exemple1.component.css'
})

export class Exemple1Component extends BodyComponent{

  override title = "Exemple 1";

  tableau = [
    {"id": 1, "value": "test1"},
    {"id": 2, "value": "test2"},
  ];


}
