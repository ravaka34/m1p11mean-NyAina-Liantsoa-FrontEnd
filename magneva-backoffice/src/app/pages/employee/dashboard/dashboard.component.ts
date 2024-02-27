import { ErrorComponent } from '../../../template/error/error.component';
import { LoaderComponent } from '../../../template/loader/loader.component';
import { PageTitleService } from '../../../service/page-title.service';
import { EmployeeService } from '../../../service/employee.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BodyComponent } from '../../../component/body/body.component';
import { HeureService } from '../../../service/heure.service';
import { SuccessComponent } from '../../../template/success/success.component';

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
  loading: boolean = false;
  error: string = "";
  error2 : string = "";
  success: string = "";
  employeID: string = "65dc447ccf95340c0db28eec";
  today = new Date();

  constructor(
    private route: ActivatedRoute, 
    pageTitleService: PageTitleService, 
    private employeeService: EmployeeService,
    private heureService: HeureService
  ) {
    super(pageTitleService);
  }

  ngOnInit(): void {
    this.loading = true;
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
        this.loading = false;
      },
      (error) => {
        this.error = error.error.message;
        this.loading = false;
      },
    );
  }

  finishTask(appointmentDetailID: string){
    this.loading = true;
    this.employeeService.finishTask(appointmentDetailID).subscribe(
      (data) => {
        this.getTasksOfDay();
        this.success = "Tâche terminée avec succès.";
        this.error = "";
      },
      (error) => {
        this.error2 = error.error.message;
        this.loading = false;
        this.error = "";
        this.success = "";
      },
    );
  }

}
