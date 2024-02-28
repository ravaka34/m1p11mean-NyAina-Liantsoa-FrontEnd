import { Component, OnInit, inject } from '@angular/core';
import { ServiceService } from '../../../../service/service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { ErrorComponent } from '../../../../template/error/error.component';
import { BodyComponent } from '../../../../component/body/body.component';
import { LoaderService } from '../../../../service/loader.service';

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

  loaderService : LoaderService = inject(LoaderService);
  serviceService : ServiceService = inject(ServiceService);

  error: string = "";

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.setPageTitleService();
    this.getAllServices();
  }

  getAllServices() {
    this.serviceService.getAllServices().subscribe(
      (data) => {
        this.services = data;
        this.loaderService.hideLoader();
      },
      (error) => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
      },
    );
  }

}
