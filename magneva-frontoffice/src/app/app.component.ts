import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from './template/footer/footer.component';
import { LoaderComponent } from './template/loader/loader.component';
import { MenuMobileComponent } from './template/menu-mobile/menu-mobile.component';
import { HeaderComponent } from './template/header/header.component';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from './service/loader.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FooterComponent,
    LoaderComponent,
    MenuMobileComponent,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'magneva-frontoffice';
  showLoader = false;

  constructor(private loaderService: LoaderService){

    this.loaderService.loader$.subscribe((data: boolean) => {
      setTimeout(() => {
        // console.log(data);
        this.showLoader = data ? data : false;
        console.log(this.showLoader);
      })
    })


  }

}
