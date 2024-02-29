import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../../service/local-storage.service';
import { CommonModule } from '@angular/common';
import { CommonFunctionnalityComponent } from '../../component/common-functionnality/common-functionnality.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent  extends CommonFunctionnalityComponent{

  localStorageService : LocalStorageService = inject(LocalStorageService);

  isManager = 1 ;
  // isManager = this.localStorageService.getItem("isManager");

  constructor(){
    super();
     this.authService.isManager$.subscribe((data) => {
      setTimeout(() => {
        console.log(typeof this.isManager)
        console.log('sidebar-data-',data);
        this.isManager = data;
      })
    });
  }
}
