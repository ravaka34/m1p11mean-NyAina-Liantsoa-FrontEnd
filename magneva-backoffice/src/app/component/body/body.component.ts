import { Component, inject } from '@angular/core';
import { PageTitleService } from '../../service/page-title.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonFunctionnalityComponent } from '../common-functionnality/common-functionnality.component';
@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent extends CommonFunctionnalityComponent{

  title: string = "";

  pageTitleService: PageTitleService = inject(PageTitleService);

  constructor() {
    super();
  }

  setPageTitleService(){
    this.pageTitleService.setData(this.title);
  }

}
