import { Component, OnInit, inject } from '@angular/core';
import { ServiceService } from '../../../../service/service.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ErrorComponent } from '../../../../template/error/error.component';
import { CommonModule } from '@angular/common';
import { BodyComponent } from '../../../../component/body/body.component';
import { HeureService } from '../../../../service/heure.service';
import { LoaderService } from '../../../../service/loader.service';

@Component({
  selector: 'app-detail-service',
  standalone: true,
  imports: [
    CommonModule,
    ErrorComponent,
    RouterModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent extends BodyComponent implements OnInit{

  loaderService : LoaderService = inject(LoaderService);
  serviceService: ServiceService = inject(ServiceService);
  heureService: HeureService = inject(HeureService);

  error: string = "";
  success: string = "";

  serviceID: string = "";
  service: any;

  override title = "Détail Service"; 

  constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
      this.setPageTitleService();
      this.getService();
  }

  formatHour(hour: Number) {
    return this.heureService.formatHour(hour);
  }

  getService(){
    this.loaderService.showLoader();
    this.serviceID = this.route.snapshot.paramMap.get('idService') ?? "";
    this.serviceService.getService(this.serviceID).subscribe(
      (data) =>{
        this.service = data;
        this.loaderService.hideLoader();
      },
      (error) =>{
        this.error = error.error.message;
        this.loaderService.hideLoader();
      }
    );
  }
}
