import { Component } from '@angular/core';
import { LoginComponent } from '../../../component/login/login.component';

@Component({
  selector: 'app-login-manager',
  standalone: true,
  imports: [
    LoginComponent
  ],
  templateUrl: './login-manager.component.html',
  styleUrl: './login-manager.component.css'
})
export class LoginManagerComponent {

  isManager: boolean = true;
  email: string = "ravaka34@gmail.com";
  password: string = "ravaka34";
}
