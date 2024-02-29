import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ErrorAlertComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formBuilder : FormBuilder = inject(FormBuilder);
  authService : AuthService = inject(AuthService);
  localStorageService : LocalStorageService = inject(LocalStorageService);
  router : Router = inject(Router);
  showPassword: boolean = false;
  error : string | null = null;

  loginForm : FormGroup = this.formBuilder.group({
    email : "ravakanyaina35@gmail.com",
    password : "ravaka35"
  })

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

   // {
        //   "id": "65d114b9694b16acf977652b",
        //   "name": "Ravaka",
        //   "firstName": "Ny Aina",
        //   "roles": [
        //       "admin",
        //       "user"
        //   ],
        //   "token": ""
        // }

  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        console.log(data);
        this.authService.isConnected = true;
        this.authService.setUser(data);
        this.router.navigate(['/accueil']);
        return;
      },
      err => {
        console.log(err);
        this.error = err.error.message;
      }
    ) ;
  }
}
