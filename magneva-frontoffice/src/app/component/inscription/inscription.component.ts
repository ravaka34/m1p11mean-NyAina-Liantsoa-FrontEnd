import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  nom = "Rasoa";
  prenom = "Jeanne";
  mail = "rasoajeanne@gmail.com";
  contact = "0348615478";
  mdp = "mdp";
  confirmMdp = "mdp";
  genres = [
    { value: 1, label: 'Homme' },
    { value: 2, label: 'Femme' }
  ];

}
