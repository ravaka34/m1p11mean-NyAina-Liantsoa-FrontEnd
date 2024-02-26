import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../../../service/page-title.service';
import { ServiceService } from '../../../../service/service.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { ErrorComponent } from '../../../../template/error/error.component';
import { CommonModule } from '@angular/common';
import { BodyComponent } from '../../../../component/body/body.component';

@Component({
  selector: 'app-detail-service',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    ErrorComponent,
    RouterModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent extends BodyComponent implements OnInit{

  loading: boolean = false;
  error: string = "";
  success: string = "";

  serviceID: string = "";
  service: any;

  override title = "Détail Service"; 

  constructor(
    pageTitleService: PageTitleService,
    private serviceService: ServiceService,
    private route: ActivatedRoute
  ) {
    super(pageTitleService);
  }

  ngOnInit(): void {
      this.setPageTitleService();
      this.getService();
  }

  getService(){
    this.loading = true;
    this.serviceID = this.route.snapshot.paramMap.get('idService') ?? "";
    this.serviceService.getService(this.serviceID).subscribe(
      (data) =>{
        this.service = data;
        this.loading = false;
      },
      (error) =>{
        this.error = error.error.message;
        this.loading = false;
      }
    );
  }
}
