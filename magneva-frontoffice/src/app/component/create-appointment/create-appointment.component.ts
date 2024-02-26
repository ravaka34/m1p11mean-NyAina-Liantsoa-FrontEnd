import { Component } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';
import { LoaderService } from '../../service/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ErrorAlertComponent
  ],
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.css'
})
export class CreateAppointmentComponent {

  error : string | null = null;

  createForm = this.formBuilder.group({
    hour: '',
    date: ''
  })

  constructor(
    private appointmentService : AppointmentService,
    private loaderService : LoaderService,
    private formBuilder : FormBuilder,
    private router : Router
  ){
  }

  onSubmit(): void {
    console.log(this.createForm.value);
    this.loaderService.showLoader();
    this.appointmentService.createAppointment(this.createForm.value).subscribe(
      (res) => {
        console.log(res);
        this.loaderService.hideLoader();
        this.router.navigate(['rendez-vous/'+res._id]);
      },
      (error) => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
      }
    )
  }
}
