import { Component, OnInit, inject } from '@angular/core';
import { BodyComponent } from '../../../../component/body/body.component';
import { PageTitleService } from '../../../../service/page-title.service';
import { EmployeeService } from '../../../../service/employee.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SuccessComponent } from '../../../../template/success/success.component';
import { ErrorComponent } from '../../../../template/error/error.component';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { CommonModule } from '@angular/common';
import { HeureService } from '../../../../service/heure.service';
import { LoaderService } from '../../../../service/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-emp-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorComponent,
    SuccessComponent
  ],
  templateUrl: './appointment-emp-list.component.html',
  styleUrl: './appointment-emp-list.component.css'
})
export class AppointmentEmpListComponent extends BodyComponent implements OnInit {

  override title = "Liste";
  appointments: any = [];

  loaderService : LoaderService = inject(LoaderService);
  employeeService: EmployeeService = inject(EmployeeService);
  heureService: HeureService = inject(HeureService);

  error: string = "";
  success: string = "";
  employeeID: string = this.getUserId();
  router: Router = inject(Router);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.setPageTitleService();
    this.getAllAppointment();
  }

  applyForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    isFinished: new FormControl()
  });

  formatHour(hour: Number) {
    return this.heureService.formatHour(hour);
  }

  status = [
    {"value": 0, "name":"Pas terminé"},
    {"value": 1, "name":"Terminé"},
  ]

  getAllAppointment() {
    const body = {
      startDate: this.applyForm.value.startDate,
      endDate: this.applyForm.value.endDate,
      isFinished: this.applyForm.value.isFinished
    };
    this.loaderService.showLoader();
    this.employeeService.getAllAppointment(this.employeeID, body).subscribe(
      (data) => {
        this.success = "";
        this.appointments = data;
        this.loaderService.hideLoader();
        this.error = "";
      },
      (error) => {
        this.success = "";
        this.error = error.error.message;
        this.loaderService.hideLoader();
      },
    );
  }

  filter(){
    this.getAllAppointment();
  }

}
