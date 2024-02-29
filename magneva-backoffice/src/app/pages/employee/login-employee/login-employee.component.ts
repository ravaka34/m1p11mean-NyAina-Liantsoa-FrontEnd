import { Component } from '@angular/core';
import { LoginComponent } from '../../../component/login/login.component';

@Component({
  selector: 'app-login-employee',
  standalone: true,
  imports: [
    LoginComponent
  ],
  templateUrl: './login-employee.component.html',
  styleUrl: './login-employee.component.css'
})
export class LoginEmployeeComponent {

  isManager: boolean = false;
  email: string = "ravaka34@gmail.com";
  password: string = "ravaka34";

}
