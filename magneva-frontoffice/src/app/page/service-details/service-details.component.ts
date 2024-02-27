import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { CommonModule } from '@angular/common';
import { ReviewCardComponent } from '../../component/review-card/review-card.component';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [
    CommonModule,
    ReviewCardComponent
  ],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css'
})
export class ServiceDetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  serviceService: ServiceService = inject(ServiceService);
  service: any;
  loaderService: LoaderService = inject(LoaderService);

  ngOnInit(){
    let serviceId = this.route.snapshot.params['id'];
    this.loaderService.showLoader();
    this.serviceService.getServiceWithReviews(serviceId).subscribe(
      data => {
        this.service = data;
        this.loaderService.hideLoader();
      }

    )
  }

  
}
