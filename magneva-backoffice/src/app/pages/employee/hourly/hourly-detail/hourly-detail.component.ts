import { Component, OnInit, inject } from '@angular/core';
import { BodyComponent } from '../../../../component/body/body.component';
import { LoaderService } from '../../../../service/loader.service';
import { HourlyService } from '../../../../service/hourly.service';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../../template/error/error.component';
import { HeureService } from '../../../../service/heure.service';
import { SuccessComponent } from '../../../../template/success/success.component';

@Component({
  selector: 'app-hourly-detail',
  standalone: true,
  imports: [
    CommonModule,
    ErrorComponent,
    SuccessComponent
  ],
  templateUrl: './hourly-detail.component.html',
  styleUrl: './hourly-detail.component.css'
})
export class HourlyDetailComponent extends BodyComponent implements OnInit {

  override title = "Détail";
  hourly: any = [];

  loaderService : LoaderService = inject(LoaderService);
  hourlyService : HourlyService = inject(HourlyService);
  heureService : HeureService = inject(HeureService);

  employeeID : string = this.getUserId();

  error: string = "";
  success: string = "";

  constructor() {
    super();
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

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.setPageTitleService();
    this.getHourly();
  }

  formatHour(hour: Number) {
    return this.heureService.formatHour(hour);
  }

  getHourly() {
    this.hourlyService.getAllHourly(this.employeeID).subscribe(
      (data) => {
        this.hourly = data;
        this.loaderService.hideLoader();
      },
      (error) => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
      },
    );
  }

  deleteHourly(hourlyID: string){
    this.loaderService.showLoader();
    this.hourlyService.deleteHourly(hourlyID).subscribe(
      (data) => {
        this.error = "";
        this.success = "Intervalle de temps supprimé avec succès!";
        this.hourly = data;
        this.loaderService.hideLoader();
      },
      (error) => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
        this.success = "";
      },
    );
  }


}
