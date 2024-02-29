import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorAlertComponent
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  formBuilder : FormBuilder = inject(FormBuilder);
  authService : AuthService = inject(AuthService);
  router : Router = inject(Router);
  error : string | null = null;

  signupForm = this.formBuilder.group({
    "name": "",
    "firstName": "",
    "sex": "",
    "email": "",
    "password": "",
    "contact": ""
  })

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(){
    console.log(this.signupForm.value);
    this.authService.signup(this.signupForm.value).subscribe(
      data => this.router.navigate(['/connecter']),
      err => this.error = err.error.message
    )
  }
}
