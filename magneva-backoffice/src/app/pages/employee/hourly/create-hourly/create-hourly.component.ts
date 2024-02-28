import { Component, OnInit, inject } from '@angular/core';
import { BodyComponent } from '../../../../component/body/body.component';
import { LoaderService } from '../../../../service/loader.service';
import { HourlyService } from '../../../../service/hourly.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../../template/error/error.component';
import { SuccessComponent } from '../../../../template/success/success.component';

@Component({
  selector: 'app-create-hourly',
  standalone: true,
  imports: [
    CommonModule,
    ErrorComponent,
    SuccessComponent,
    ReactiveFormsModule
  ],
  templateUrl: './create-hourly.component.html',
  styleUrl: './create-hourly.component.css'
})
export class CreateHourlyComponent extends BodyComponent implements OnInit{

  override title: string = "Nouveau horaire de travail";

  loaderService : LoaderService = inject(LoaderService);
  hourlyService : HourlyService = inject(HourlyService);

  employeeID : string = "65dc4454cf95340c0db28ee4";

  error: string = "";
  success: string = "";

  imageDataUrl: string | null = null;

  applyForm = new FormGroup({
    hourStart: new FormControl(''),
    hourEnd: new FormControl(''),
    day: new FormControl(1)
  });

  constructor() {
    super();
  }

  ngOnInit(): void{
    this.setPageTitleService();
  }

  semaines = [
    {"day": 1, "nameDay": "Lundi"},
    {"day": 2, "nameDay": "Mardi"},
    {"day": 3, "nameDay": "Mercredi"},
    {"day": 4, "nameDay": "Jeudi"},
    {"day": 5, "nameDay": "Vendredi"},
    {"day": 6, "nameDay": "Samedi"},
    {"day": 0, "nameDay": "Dimanche"}
  ];

  getNameDay(day: any): string {
    const semaine = this.semaines.find(semaine => semaine.day === parseInt(day));
    return semaine ? semaine.nameDay : '';
  }

  submitForm(){
    const body = {
      employee: this.employeeID,
      day: this.applyForm.value.day,
      hourStart: this.applyForm.value.hourStart,
      hourEnd: this.applyForm.value.hourEnd,
      nameDay: this.getNameDay(this.applyForm.value.day)
    }
    console.log(body);
    this.loaderService.showLoader();
    this.hourlyService.createHourly(body).subscribe(
      (data) =>{
        this.success = "Horaire de travail créé avec succès!";
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
