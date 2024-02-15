import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Section1Component } from '../section1/section1.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    Section1Component
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  
  currentTime: string = '16:23';

  mail= "magneva@gmail.com";
  pays= "Madagascar";
  phone = "0348615850";

  getCurrentDate(): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    };
    return new Date().toLocaleDateString('fr-FR', options);
  }
  currentDate= this.getCurrentDate();


}
