import { Component, inject } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { LoaderService } from '../../service/loader.service';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from '../../component/service-card/service-card.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    ServiceCardComponent
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  services!: any[];
  serviceService : ServiceService = inject(ServiceService);
  loaderService : LoaderService = inject(LoaderService);

  ngOnInit() {
    this.loaderService.showLoader();
    this.serviceService.getAllServicesWithReviews().subscribe(
      data => {
        this.services = data;
        this.loaderService.hideLoader();
      }
    )
  }
}
