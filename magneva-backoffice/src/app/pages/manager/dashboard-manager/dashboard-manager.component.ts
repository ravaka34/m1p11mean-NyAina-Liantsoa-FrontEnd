import { Component, OnInit, inject } from '@angular/core';
import { BodyComponent } from '../../../component/body/body.component';
import { LoaderService } from '../../../service/loader.service';
import { StatistiqueService } from '../../../service/statistique.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateService } from '../../../service/date.service';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../template/error/error.component';
import { ChartLineComponent } from '../../../component/chart-line/chart-line.component';

@Component({
  selector: 'app-dashboard-manager',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorComponent,
    ChartLineComponent
  ],
  templateUrl: './dashboard-manager.component.html',
  styleUrl: './dashboard-manager.component.css'
})
export class DashboardManagerComponent extends BodyComponent implements OnInit{

  override title = "Accueil";

  loaderService : LoaderService = inject(LoaderService);
  statistiqueService: StatistiqueService = inject(StatistiqueService);
  dateService: DateService = inject(DateService);
  
  error: string = "";
  error2 : string = "";
  success: string = "";

  startDate : string = this.dateService.getTodayDate();
  endDate : string = this.dateService.getEndOfWeek();
  year : Number = new Date().getFullYear();

  constructor() {
    super();
  }

  name1 : string = "Nombre de réservation";
  name2 : string = "Chiffre d'affaire";
  name3 : string = "Bénéfice";
  name4 : string = "Temps de travail";

  type1 : string = "pie";
  type2 : string = "column";

  nbReservationJour: any;
  nbReservationMois: any;
  caJour: any;
  caMois: any;
  profit: any;
  emp: any;

  months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  ngOnInit(): void {
    this.setPageTitleService();
    this.statsInit();
  }

  applyForm1 = new FormGroup({
    startDate1: new FormControl(this.startDate),
    endDate1: new FormControl(this.endDate)
  });

  applyForm2 = new FormGroup({
    startDate2: new FormControl(this.startDate),
    endDate2: new FormControl(this.endDate)
  });

  applyForm3 = new FormGroup({
    year3: new FormControl(this.year),
  });

  applyForm4 = new FormGroup({
    year4: new FormControl(this.year),
  });

  applyForm5 = new FormGroup({
    year5: new FormControl(this.year),
  });

  applyForm6 = new FormGroup({
    startDate6: new FormControl(this.startDate),
    endDate6: new FormControl(this.endDate)
  });

  statsInit(){
    this.loaderService.showLoader();
    const body = {
      startDate: this.startDate,
      endDate: this.endDate,
      year: this.year
    }
    this.statistiqueService.statsInit(body).subscribe(
      (data) => {
        this.nbReservationJour = data.nbReservationJour;
        this.nbReservationMois = data.nbReservationMois;
        this.caJour = data.caJour;
        this.caMois = data.caMois;
        this.profit = data.profit;
        this.emp = data.emp;
        this.loaderService.hideLoader();
      },
      (error) => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
      },
    );
  }
  
  getNbReservationJour() {
    this.loaderService.showLoader();
    const body = {
      startDate: this.applyForm1.value.startDate1,
      endDate: this.applyForm1.value.endDate1,
    }
    this.statistiqueService.statAppointmentInOneDay(body).subscribe(
      (data) => {
        this.nbReservationJour = data;
        this.loaderService.hideLoader();
      },
      (error) => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
      },
    );
  }

  getNbReservationMois() {
    this.loaderService.showLoader();
    const body = {
      year: this.applyForm3.value.year3,
    }
    this.statistiqueService.statAppointment(body).subscribe(
      (data) => {
        this.nbReservationMois = data;
        this.loaderService.hideLoader();
      },
      (error) => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
      },
    );
  }

  getCaJour() {
    this.loaderService.showLoader();
    const body = {
      startDate: this.applyForm2.value.startDate2,
      endDate: this.applyForm2.value.endDate2,
    }
    this.statistiqueService.chiffreAffaireDay(body).subscribe(
      (data) => {
        this.caJour = data;
        this.loaderService.hideLoader();
      },
      (error) => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
      },
    );
  }

  getCaMois() {
    this.loaderService.showLoader();
    const body = {
      year: this.applyForm4.value.year4,
    }
    this.statistiqueService.chiffreAffaire(body).subscribe(
      (data) => {
        this.caMois = data;
        this.loaderService.hideLoader();
      },
      (error) => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
      },
    );
  }

  getProfit() {
    this.loaderService.showLoader();
    const body = {
      year: this.applyForm5.value.year5
    }
    this.statistiqueService.getProfit(body).subscribe(
      (data) => {
        this.profit = data;
        this.loaderService.hideLoader();
      },
      (error) => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
      },
    );
  }

  getEmp() {
    this.loaderService.showLoader();
    const body = {
      startDate: this.applyForm6.value.startDate6,
      endDate: this.applyForm6.value.endDate6,
    }
    this.statistiqueService.statEmp(body).subscribe(
      (data) => {
        this.emp = data;
        this.loaderService.hideLoader();
      },
      (error) => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
      },
    );
  }

  submitForm(temoin: Number){
    if(temoin === 1){
      this.getNbReservationJour();
    }
    if(temoin === 3){
      this.getNbReservationMois();
    }
    if(temoin === 2){
      this.getCaJour();
    }
    if(temoin === 4){
      this.getCaMois();
    }
    if(temoin === 5){
      this.getProfit();
    }
    if(temoin === 6){
      this.getEmp();
    }
  }

}
