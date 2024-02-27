import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReviewService } from '../../service/review.service';
import { LoaderService } from '../../service/loader.service';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';
import { Router } from '@angular/router';
import { CommonFunctionalityComponentComponent } from '../common-functionality-component/common-functionality-component.component';


@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ErrorAlertComponent
  ],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css'
})
export class AddReviewComponent extends CommonFunctionalityComponentComponent {

  formBuilder : FormBuilder = inject(FormBuilder);
  createForm! : FormGroup ;
  reviewService : ReviewService = inject(ReviewService);
  loaderService : LoaderService = inject(LoaderService);
  error : string | null = null;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<AddReviewComponent>,
  public override router:Router){
    super(router);
    this.createForm = this.formBuilder.group({
      "note": this.data.note,
      "description": this.data.description
    })
  }

  onSubmit(){
    console.log(this.createForm.value);
    this.update();
  }

  update(){
    let updateData = {
      reviewId : this.data._id,
      note : this.createForm.value.note ,
      description : this.createForm.value.description
    }
    this.loaderService.showLoader();
    this.reviewService.updateReview(updateData).subscribe(
      data => {
        //redirect to the details page
        this.loaderService.hideLoader();
        this.dialogRef.close();
        this.reloadComponent(true);
       },
      error => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
      }
    ) ;
  }
}
