import { Component, inject } from '@angular/core';
import { PageTitleService } from '../../service/page-title.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent{

  title: string = "";

  pageTitleService: PageTitleService = inject(PageTitleService);

  constructor() {}

  setPageTitleService(){
    this.pageTitleService.setData(this.title);
  }

}
