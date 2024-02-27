import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReviewCardComponent } from '../../component/review-card/review-card.component';
import { LoaderService } from '../../service/loader.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddReviewComponent } from '../../component/add-review/add-review.component';
import { ReviewService } from '../../service/review.service';

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
  reviewService: ReviewService = inject(ReviewService);
  service: any;
  loaderService: LoaderService = inject(LoaderService);
  dialog: MatDialog = inject(MatDialog);

  ngOnInit(){
    let serviceId = this.route.snapshot.params['id'];
    this.loaderService.showLoader();
    this.reviewService.getEntityWithReviews(serviceId, "service").subscribe(
      data => {
        this.service = data;
        this.loaderService.hideLoader();
      }
    )
  }

  openAddReview(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      isCreate : true,
      entityName : "service",
      entityId : this.service.entity._id
    };
    this.dialog.open(AddReviewComponent, dialogConfig);
  }
}
