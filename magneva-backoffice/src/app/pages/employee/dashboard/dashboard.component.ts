import { ErrorComponent } from '../../../template/error/error.component';
import { LoaderComponent } from '../../../template/loader/loader.component';
import { EmployeeService } from '../../../service/employee.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { BodyComponent } from '../../../component/body/body.component';
import { HeureService } from '../../../service/heure.service';
import { SuccessComponent } from '../../../template/success/success.component';
import { LoaderService } from '../../../service/loader.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    ErrorComponent,
    SuccessComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent extends BodyComponent implements OnInit{

  override title = "Accueil";
  tasks: any;

  loaderService : LoaderService = inject(LoaderService);
  employeeService: EmployeeService = inject(EmployeeService);
  heureService: HeureService = inject(HeureService);
  
  error: string = "";
  error2 : string = "";
  success: string = "";
  employeID: string = "65dc447ccf95340c0db28eec";
  today = new Date();

  constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.setPageTitleService();
    this.getTasksOfDay();
  }

  formatHour(hour: Number) {
    return this.heureService.formatHour(hour);
  }
  
  getTasksOfDay() {
    this.employeeService.getTasksOfDay(this.employeID).subscribe(
      (data) => {
        this.tasks = data;
        this.loaderService.hideLoader();
      },
      (error) => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
      },
    );
  }

  finishTask(appointmentDetailID: string){
    this.loaderService.showLoader();
    this.employeeService.finishTask(appointmentDetailID).subscribe(
      (data) => {
        this.getTasksOfDay();
        this.success = "Tâche terminée avec succès.";
        this.error = "";
      },
      (error) => {
        this.error2 = error.error.message;
        this.loaderService.hideLoader();
        this.error = "";
        this.success = "";
      },
    );
  }

}
