import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../../../../service/employee.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { ErrorComponent } from '../../../../template/error/error.component';
import { BodyComponent } from '../../../../component/body/body.component';
import { LoaderService } from '../../../../service/loader.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoaderComponent,
    ErrorComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [EmployeeService]
})
export class ListComponent extends BodyComponent implements OnInit  {

  override title = "Liste";
  employees: any = [];

  loaderService : LoaderService = inject(LoaderService);
  employeeService: EmployeeService = inject(EmployeeService);

  error: string = "";

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.setPageTitleService();
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      (data) => {
        this.employees = data;
        this.loaderService.hideLoader();
      },
      (error) => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
      },
    );
  }
  
}