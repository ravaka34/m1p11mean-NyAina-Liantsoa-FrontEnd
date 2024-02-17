import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './template/loader/loader.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { FooterComponent } from './template/footer/footer.component';
import { HeaderComponent } from './template/header/header.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login/login.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LoaderComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'magneva-backoffice';
  
  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/connexion';
  }

}
