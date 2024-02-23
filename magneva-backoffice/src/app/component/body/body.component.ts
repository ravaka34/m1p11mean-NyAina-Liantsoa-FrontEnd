import { Component } from '@angular/core';
import { PageTitleService } from '../../service/page-title.service';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from '../../template/loader/loader.component';
import { CommonModule } from '@angular/common';

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

  constructor(private pageTitleService: PageTitleService) {}

  setPageTitleService(){
    this.pageTitleService.setData(this.title);
  }

}
