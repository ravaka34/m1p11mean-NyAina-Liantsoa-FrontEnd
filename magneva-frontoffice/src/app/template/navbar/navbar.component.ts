import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../../service/local-storage.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { USER_TOKEN_KEY } from '../../service/key';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,
  CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  localStorageService: LocalStorageService = inject(LocalStorageService);
  authService: AuthService = inject(AuthService);
  isConnected! : boolean;
  user : any = null;
  isBrowser : boolean = false;
}
