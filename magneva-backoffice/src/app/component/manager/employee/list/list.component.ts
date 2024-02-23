import { Component, OnInit } from '@angular/core';
import { BodyComponent } from '../../../body/body.component';
import { EmployeeService } from '../../../../service/employee.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageTitleService } from '../../../../service/page-title.service';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { ErrorComponent } from '../../../error/error.component';

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
  loading: boolean = false;
  error: string = "";

  constructor(
    pageTitleService: PageTitleService, 
    private employeeService: EmployeeService
  ) {
    super(pageTitleService);
  }

  ngOnInit(): void {
    this.loading = true;
    this.setPageTitleService();
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      (data) => {
        this.employees = data;
        this.loading = false;
      },
      (error) => {
        this.error = error.error.message;
        this.loading = false;
      },
    );
  }
  
}