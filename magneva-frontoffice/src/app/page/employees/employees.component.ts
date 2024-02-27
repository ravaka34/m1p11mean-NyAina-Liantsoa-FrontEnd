import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { LoaderService } from '../../service/loader.service';
import { ReviewService } from '../../service/review.service';
import { EmployeeCardComponent } from '../../component/employee-card/employee-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    EmployeeCardComponent,
    CommonModule
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  employees!: any[];
  reviewService : ReviewService = inject(ReviewService);
  loaderService : LoaderService = inject(LoaderService);

  ngOnInit() {
    this.loaderService.showLoader();
    this.reviewService.getAllEntitiesWithReviews("employees").subscribe(
      data => {
        this.employees = data;
        this.loaderService.hideLoader();
      }
    )
  }
}
