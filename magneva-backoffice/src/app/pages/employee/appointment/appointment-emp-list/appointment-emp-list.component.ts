import { Component, OnInit } from '@angular/core';
import { BodyComponent } from '../../../../component/body/body.component';
import { PageTitleService } from '../../../../service/page-title.service';
import { EmployeeService } from '../../../../service/employee.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SuccessComponent } from '../../../../template/success/success.component';
import { ErrorComponent } from '../../../../template/error/error.component';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { CommonModule } from '@angular/common';
import { HeureService } from '../../../../service/heure.service';

@Component({
  selector: 'app-appointment-emp-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoaderComponent,
    ErrorComponent,
    SuccessComponent
  ],
  templateUrl: './appointment-emp-list.component.html',
  styleUrl: './appointment-emp-list.component.css'
})
export class AppointmentEmpListComponent extends BodyComponent implements OnInit {

  override title = "Liste";
  appointments: any = [];
  loading: boolean = false;
  error: string = "";
  success: string = "";
  employeeID: string = "65dc447ccf95340c0db28eec";

  constructor(
    pageTitleService: PageTitleService, 
    private employeeService: EmployeeService,
    private heureService: HeureService
  ) {
    super(pageTitleService);
  }

  ngOnInit(): void {
    this.loading = true;
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
    {"value": 0, "name":"Terminé"},
  ]

  getAllAppointment() {
    const body = {
      startDate: this.applyForm.value.startDate,
      endDate: this.applyForm.value.endDate,
      isFinished: this.applyForm.value.isFinished
    };
    this.loading = true;
    this.employeeService.getAllAppointment(this.employeeID, body).subscribe(
      (data) => {
        this.success = "";
        this.appointments = data;
        console.log(this.appointments);
        this.loading = false;
        this.error = "";
      },
      (error) => {
        this.success = "";
        this.error = error.error.message;
        this.loading = false;
      },
    );
  }

  filter(){
    this.getAllAppointment();
  }

}
