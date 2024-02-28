import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../service/review.service';
import { LoaderService } from '../../service/loader.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddReviewComponent } from '../../component/add-review/add-review.component';
import { CommonModule } from '@angular/common';
import { ReviewCardComponent } from '../../component/review-card/review-card.component';

@Component({
  selector: 'app-employees-details',
  standalone: true,
  imports: [
    CommonModule,
    ReviewCardComponent
  ],
  templateUrl: './employees-details.component.html',
  styleUrl: './employees-details.component.css'
})
export class EmployeesDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  reviewService: ReviewService = inject(ReviewService);
  employee: any;
  loaderService: LoaderService = inject(LoaderService);
  dialog: MatDialog = inject(MatDialog);

  ngOnInit(){
    let employeeId = this.route.snapshot.params['id'];
    this.loaderService.showLoader();
    this.reviewService.getEntityWithReviews(employeeId, "employee").subscribe(
      data => {
        this.employee = data;
        this.loaderService.hideLoader();
      }
    )
  }

  openAddReview(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      isCreate : true,
      entityName : "employee",
      entityId : this.employee.entity._id
    };
    this.dialog.open(AddReviewComponent, dialogConfig);
  }
}
