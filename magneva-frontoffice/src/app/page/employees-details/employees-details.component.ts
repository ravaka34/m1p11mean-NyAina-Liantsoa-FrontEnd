import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../service/review.service';
import { LoaderService } from '../../service/loader.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddReviewComponent } from '../../component/add-review/add-review.component';
import { CommonModule } from '@angular/common';
import { ReviewCardComponent } from '../../component/review-card/review-card.component';
import { BreadcrumbChild } from '../../interface/breadcrumbchild';
import { BreadcrumbComponent } from '../../component/breadcrumb/breadcrumb.component';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-details',
  standalone: true,
  imports: [
    CommonModule,
    ReviewCardComponent,
    BreadcrumbComponent
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
  title = "Détails membre";
  services = "";
  authService = inject(AuthService);
  router: Router = inject(Router);

  ngOnInit(){
    if(this.authService.isConnected == false){
      this.router.navigate(['/connecter']);
      return;
    }else{
      let employeeId = this.route.snapshot.params['id'];
      this.loaderService.showLoader();
      this.reviewService.getEntityWithReviews(employeeId, "employee").subscribe(
        data => {
          this.loaderService.hideLoader();
          this.employee = data;
          this.prepareStringService();
        }
      )
    }

  }

  prepareStringService(){
    for(let service of this.employee.services.services){
      this.services += " "+service.name;
  }
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

  breadcrumChilds: BreadcrumbChild [] = [
    {
      title: "ACCUEIL",
      link: "/accueil"
    },
    {
      title: "RENDEZ-VOUS",
      link: null
    },
  ]
}
