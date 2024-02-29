import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './template/loader/loader.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { FooterComponent } from './template/footer/footer.component';
import { HeaderComponent } from './template/header/header.component';
import { CommonModule } from '@angular/common';
import { LoaderService } from './service/loader.service';
import { LoginManagerComponent } from './pages/manager/login-manager/login-manager.component';
import { LoginEmployeeComponent } from './pages/employee/login-employee/login-employee.component';
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
    LoginManagerComponent,
    LoginEmployeeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'magneva-backoffice';
  
  showLoader = false;
  hideSidebar: boolean = false;

  constructor(
    private loaderService: LoaderService,
    private router: Router
  ){
    this.loaderService.loader$.subscribe((data: boolean) => {
      setTimeout(() => {
        this.showLoader = data ? data : false;
      })
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideSidebar = this.router.url.includes('/manager/connexion') || this.router.url.includes('/employe/connexion') ;
      }
    });
  }

  isLoginManager(): boolean {
    return this.router.url === '/manager/connexion';
  }

  isLoginEmployee(): boolean {
    return this.router.url === '/employe/connexion';
  }

}
