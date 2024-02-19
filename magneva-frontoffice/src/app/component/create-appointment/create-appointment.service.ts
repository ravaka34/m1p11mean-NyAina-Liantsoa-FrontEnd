import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAppointmentComponent } from './create-appointment.component'; 
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CreateAppointmentService {

  constructor(private dialog: MatDialog) { }

  submitCreation(creationForm: FormGroup){
    console.log(creationForm);
  }

  openPopup(){
    this.dialog.open(CreateAppointmentComponent);
  }
}
