import { Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ErrorAlertComponent } from '../../component/error-alert/error-alert.component';
import { LoaderService } from '../../service/loader.service';
import { Router } from '@angular/router';
import { ReviewService } from '../../service/review.service';
import { ChooseServiceComponent } from '../../component/choose-service/choose-service.component';
import { ChooseEmployeeComponent } from '../../component/choose-employee/choose-employee.component';
import { CdkDropList, CdkDragDrop, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import moment from 'moment';


@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ErrorAlertComponent,
    ChooseServiceComponent,
    ChooseEmployeeComponent,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.css'
})
export class CreateAppointmentComponent implements DoCheck {

  error : string | null = null;
  services! : any[];
  employees! : any;
  selectedServices : any[] = [];
  totalHours = 0;
  priceTotal = 0;
  duration = "";

  otherInformation = this.formBuilder.group({
    hour: '',
    date: ''
  });

  constructor(
    private reviewService : ReviewService,
    private appointmentService : AppointmentService,
    private loaderService : LoaderService,
    private formBuilder : FormBuilder,
    private router : Router
  ){
  }

  ngOnInit(){
    this.loaderService.showLoader();
    this.appointmentService.getCreateDatas().subscribe(
      (res) => {
        this.services = res.services;
        this.employees = res.employees;
        this.loaderService.hideLoader();
      }
    )
  }

  ngDoCheck(){
    console.log('there are changes');

    this.updateTotalHours();
    this.updateTotalPrice();

  }

  private updateTotalHours(): void {
    this.totalHours = this.selectedServices.reduce((total, service) => total + service.entity.duration, 0);
    this.duration = moment(this.totalHours.toString().padStart(4,'0'),  "HH:mm").format("HH:mm");
  }

  private updateTotalPrice(): void {
    this.priceTotal = this.selectedServices.reduce((total, service) => total + service.entity.price, 0);
  }

  drop(event: CdkDragDrop<string[]>){
    console.log(event);
    moveItemInArray(this.selectedServices, event.previousIndex, event.currentIndex);
    console.log(this.selectedServices);
  }

  onClick(): void {
    this.sendData();
  }

  sendData(){
    console.log(this.otherInformation.value);
    if(this.selectedServices == null || this.selectedServices.length == 0){
      this.error = "Veuillez choisir un service";
      return;
    }

    for(let selected of this.selectedServices){
      if(!selected.employee){
        this.error = "Veuillez choisir un professionel";
        return;
      }
    }
    let jsonToSend = {
      date : this.otherInformation.value.date,
      hour : this.otherInformation.value.hour,
      services : this.selectedServices
    }

    console.log(jsonToSend);
    this.loaderService.showLoader();
    this.appointmentService.createAppointment(jsonToSend).subscribe(
      (res) => {
        console.log(res);
        this.loaderService.hideLoader();
        // this.router.navigate(['rendez-vous/'+res._id]);
      },
      (error) => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
      }
    )
  }
}
