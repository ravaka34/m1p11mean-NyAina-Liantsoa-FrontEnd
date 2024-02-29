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
  description = "MAGNEVA est un salon de beauté situé à Madagascar, spécialisé dans une gamme complète de services de soins esthétiques et de bien-être. Notre équipe dévouée est prête à vous offrir une expérience luxueuse et revitalisante, où vous pourrez vous détendre et vous faire chouchouter dans un cadre élégant et apaisant.";
  mail = "magneva@gmail.com";
  phone = "0348615850";
}
