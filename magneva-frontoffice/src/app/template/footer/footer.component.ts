import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  description = "MAGNEVA est une salon de beauté";
  mail = "magneva@gmail.com";
  phone = "0348615850";
}
