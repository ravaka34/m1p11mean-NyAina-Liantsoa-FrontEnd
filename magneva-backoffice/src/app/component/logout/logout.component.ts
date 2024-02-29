import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  authService : AuthService = inject(AuthService);
  router : Router = inject(Router);
  isAdmin! : boolean ;

  ngOnInit(){
    console.log("eto");
    this.isAdmin = this.authService.getUser().roles[0] == "admin" ;
    this.authService.setUser(null);
    if(this.isAdmin){
      console.log("go login manager");
      this.router.navigate(['/manager/connexion']);
      return;
    }else{
      console.log("go login employee");
      this.router.navigate(['/employe/connexion']);
      return;
    }
  }
}
