import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  mail = "rakotojean@gmail.com";
  mdp = "rakoto1234";

  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
