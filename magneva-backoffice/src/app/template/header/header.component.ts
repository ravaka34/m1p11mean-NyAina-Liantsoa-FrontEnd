import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PageTitleService } from '../../service/page-title.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  pageTitle: any;

  constructor(private pageTitleService: PageTitleService
    ) {}

  ngOnInit(): void {
    this.pageTitleService.data$.subscribe(data => {
      this.pageTitle = data;
    });
  }

}
