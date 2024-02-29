import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-common-functionnality',
  standalone: true,
  imports: [],
  templateUrl: './common-functionnality.component.html',
  styleUrl: './common-functionnality.component.css'
})
export class CommonFunctionnalityComponent {
  public authService : AuthService = inject(AuthService);

  getUser(){
    return this.authService.getUser();
  }

  isConnected(){
    return !(this.authService.getUser() == null);
  }

  getUserId(){
    return (this.isConnected()) ? this.authService.getUser().id : "";
  }
}
