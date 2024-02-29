import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReviewService } from '../../service/review.service';
import { LoaderService } from '../../service/loader.service';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';
import { Router } from '@angular/router';
import { CommonFunctionalityComponentComponent } from '../common-functionality-component/common-functionality-component.component';
import { AuthService } from '../../service/auth.service';


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
  createForm : FormGroup = this.formBuilder.group({
    "note": '',
    "description": 'Saisir une description'
  });
  reviewService : ReviewService = inject(ReviewService);
  loaderService : LoaderService = inject(LoaderService);
  error : string | null = null;
  authService : AuthService = inject(AuthService);


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<AddReviewComponent>,
  public override router:Router){
    super(router);
    if(!data.isCreate){
      this.createForm = this.formBuilder.group({
        "note": this.data.note,
        "description": this.data.description
      })
    }
  }

  onSubmit(){
    console.log(this.createForm.value);
    if(this.data.isCreate){
      this.create();
    }else{
      this.update();
    }
  }

// {
//     "description": "La service est top.",
//     "note": "4",
//     "user": "65d114b9694b16acf977652b",
//     "service" : "65d200cf0d829e1159c1f4d7"
// }
// OR
// {
//     "description": "La service est top.",
//     "note": "4",
//     "user": "65d114b9694b16acf977652b",
//     "employee" : "65d200cf0d829e1159c1f4d7"
// }
  create(){
    // TODO: make the user dynamic
    let createData : any = {
      note:this.createForm.value.note,
      user: this.authService.getUser()._id,
      description: this.createForm.value.description
    }
    createData[this.data.entityName] = this.data.entityId;

    this.loaderService.showLoader();
    this.reviewService.createReview(createData).subscribe(
      data => {
        //redirect to the details page

        this.dialogRef.close();
        this.loaderService.hideLoader();
        this.reloadComponent(true);
       },
      error => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
      }
    )
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
        this.dialogRef.close();
        this.loaderService.hideLoader();
        this.reloadComponent(true);
       },
      error => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
      }
    ) ;
  }
}
