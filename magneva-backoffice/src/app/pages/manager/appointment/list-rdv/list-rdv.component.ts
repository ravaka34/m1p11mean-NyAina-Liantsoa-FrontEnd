import { Component, OnInit, inject } from '@angular/core';
import { BodyComponent } from '../../../../component/body/body.component';
import { LoaderService } from '../../../../service/loader.service';
import { AppointmentService } from '../../../../service/appointment.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../../template/error/error.component';
import { SuccessComponent } from '../../../../template/success/success.component';
import { HeureService } from '../../../../service/heure.service';

@Component({
  selector: 'app-list-rdv',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorComponent,
    SuccessComponent
  ],
  templateUrl: './list-rdv.component.html',
  styleUrl: './list-rdv.component.css'
})
export class ListRdvComponent extends BodyComponent implements OnInit {

  override title = "Liste";
  rdvs: any = [];

  loaderService : LoaderService = inject(LoaderService);
  appointmentService: AppointmentService = inject(AppointmentService);
  heureService: HeureService = inject(HeureService);

  error: string = "";
  success: string = "";

  constructor() {
    super();
  }

  formatHour(hour: Number) {
    return this.heureService.formatHour(hour);
  }
  
  ngOnInit(): void {
    this.loaderService.showLoader();
    this.setPageTitleService();
    this.getAllAppointment();
  }

  page: Number = 1;
  pageSize: Number = 10;

  statuts = [
    {"value": "true", "name":"Payé"},
    {"value": "false", "name":"Non Payé"}
  ];

  applyForm = new FormGroup({
    user: new FormControl(''),
    minDate:  new FormControl(''),
    maxDate:  new FormControl(''),
    minHour:  new FormControl(''),
    maxHour:  new FormControl(''),
    minPrice:  new FormControl(''),
    maxPrice:  new FormControl(''),
    isPaid:  new FormControl('')
  });

  getAllAppointment() {
    const body = {
      user: this.applyForm.value.user,
      minDate: this.applyForm.value.minDate,
      maxDate: this.applyForm.value.maxDate,
      minHour: this.applyForm.value.minHour,
      maxHour: this.applyForm.value.maxHour,
      minPrice: this.applyForm.value.minPrice,
      maxPrice: this.applyForm.value.maxPrice,
      isPaid: this.applyForm.value.isPaid,
      page: this.page,
      pageSize: this.pageSize
    };
    this.loaderService.showLoader();
    this.appointmentService.getAllAppointment(body).subscribe(
      (data) => {
        this.success = "";
        this.rdvs = data;
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

  payer(rdv_id : string){
    var montant = document.getElementById("montant"+rdv_id) as HTMLInputElement;
    var date = document.getElementById("date"+rdv_id) as HTMLInputElement;
    const body = {
      appointment: rdv_id,
      amount: parseInt(montant.value),
      date: date.value
    };
    console.log(body);
    this.loaderService.showLoader();
    this.appointmentService.payment(body).subscribe(
      (data) => {
        this.getAllAppointment();
        this.success = "Payment effectué avec succès";
      },
      (error) => {
        this.success = "";
        this.error = error.error.message;
        this.loaderService.hideLoader();
      },
    );
  }
}
