import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../../service/local-storage.service';
import { CommonModule } from '@angular/common';

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
export class SidebarComponent {

  localStorageService : LocalStorageService = inject(LocalStorageService);

  isManager = 0;
  // isManager = this.localStorageService.getItem("isManager");
}
