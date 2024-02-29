import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { Router, RouterModule } from '@angular/router';
import { ErrorComponent } from '../../template/error/error.component';
import { LoaderComponent } from '../../template/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorComponent,
    RouterModule,
    LoaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  @Input() isManager!: boolean;
  @Input() email!: string;
  @Input() password!: string;

  loginService : LoginService = inject(LoginService);
  localStorageService : LocalStorageService = inject(LocalStorageService);

  error : string = "";
  loading : boolean = false;

  showPassword: boolean = false;

  constructor(
    private router: Router
  ) { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  applyForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {
    this.applyForm.patchValue({
      email: this.email,
      password: this.password
    })
  }

  login(){
    const body : any = {
      email: this.applyForm.value.email,
      password: this.applyForm.value.password,
      role: "admin"
    }
    if(!this.isManager){
      body.role = "user";
    }
    this.loginService.login(body).subscribe(
      (data) =>{
        this.loading = false;
        this.localStorageService.setItem("user", data);
        if(this.isManager){
          this.localStorageService.setItem("isManager", 1);
          this.router.navigate(['/manager/accueil']);
        }else{
          this.localStorageService.setItem("isManager", 0);
          this.router.navigate(['/employe/accueil']);
        }
      },
      (error) =>{
        this.error = error.error.message;
        this.loading = false;
      }
    );
  }
}
