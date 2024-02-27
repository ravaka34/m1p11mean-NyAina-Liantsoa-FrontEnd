import { Component, inject } from '@angular/core';
import { LoaderService } from '../../service/loader.service';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from '../../component/service-card/service-card.component';
import { ReviewService } from '../../service/review.service';

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
  reviewService : ReviewService = inject(ReviewService);
  loaderService : LoaderService = inject(LoaderService);

  ngOnInit() {
    this.loaderService.showLoader();
    this.reviewService.getAllEntitiesWithReviews("services").subscribe(
      data => {
        this.services = data;
        this.loaderService.hideLoader();
      }
    )
  }
}
