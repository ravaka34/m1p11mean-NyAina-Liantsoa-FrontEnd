import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../../template/error/error.component';
import { SuccessComponent } from '../../../../template/success/success.component';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { DateService } from '../../../../service/date.service';
import { EmployeeService } from '../../../../service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BodyComponent } from '../../../../component/body/body.component';
import { LoaderService } from '../../../../service/loader.service';

@Component({
  selector: 'app-add-salary',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ErrorComponent,
    SuccessComponent,
    LoaderComponent
  ],
  templateUrl: './add-salary.component.html',
  styleUrl: './add-salary.component.css',
  providers: [
    EmployeeService
  ]
})
export class AddSalaryComponent extends BodyComponent implements OnInit{

  override title: string = "Ajout/Modification salaire";

  loaderService : LoaderService = inject(LoaderService);
  dateService: DateService = inject(DateService);
  employeeService: EmployeeService = inject(EmployeeService);

  error: string = "";
  success: string = "";

  employeID: string = "";
  employee: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  applyForm = new FormGroup({
    date: new FormControl(this.dateService.getTodayDate()),
    amount: new FormControl('0')
  });

  ngOnInit(): void {
    this.setPageTitleService();
    this.getEmployee();
  }

  getEmployee(){
    this.loaderService.showLoader();
    this.employeID = this.route.snapshot.paramMap.get('idEmploye') ?? "";
    this.employeeService.getEmployee(this.employeID).subscribe(
      (data) =>{
        this.employee = data;
        this.loaderService.hideLoader();
      },
      (error) =>{
        this.error = error.error.message;
        this.loaderService.hideLoader();
      }
    );
  }

  addOrUpdateSalary(){
    const salary = {
      employee: this.employee.info.employee._id,
      amount: this.applyForm.value.amount,
      date: this.applyForm.value.date
    };
    this.employeeService.addOrUpdateSalary(salary).subscribe(
      (data) =>{
        this.router.navigate(["/manager/employe/detail/"+this.employee.info.employee._id]);
        this.error = "";
        this.loaderService.hideLoader();
      },
      (error) =>{
        this.error = error.error.message;
        this.success = "";
        this.loaderService.hideLoader();
      }
    );

  }


}
