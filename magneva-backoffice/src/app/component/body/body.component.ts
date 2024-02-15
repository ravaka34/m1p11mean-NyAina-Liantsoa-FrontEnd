import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../service/page-title.service';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements OnInit {
  
  constructor(private pageTitleService: PageTitleService) {}

  title : string = "";

  ngOnInit(): void {
    this.pageTitleService.setData(this.title);
  }
  
}