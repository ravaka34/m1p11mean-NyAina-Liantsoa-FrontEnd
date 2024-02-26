import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../../../service/page-title.service';
import { ServiceService } from '../../../../service/service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { ErrorComponent } from '../../../../template/error/error.component';
import { BodyComponent } from '../../../../component/body/body.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoaderComponent,
    ErrorComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent extends BodyComponent implements OnInit {

  override title = "Liste";
  services: any = [];
  loading: boolean = false;
  error: string = "";

  constructor(
    pageTitleService: PageTitleService, 
    private serviceService: ServiceService
  ) {
    super(pageTitleService);
  }

  ngOnInit(): void {
    this.loading = true;
    this.setPageTitleService();
    this.getAllServices();
  }

  getAllServices() {
    this.serviceService.getAllServices().subscribe(
      (data) => {
        this.services = data;
        this.loading = false;
      },
      (error) => {
        this.error = error.error.message;
        this.loading = false;
      },
    );
  }

}
