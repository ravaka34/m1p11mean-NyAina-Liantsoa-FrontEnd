import { Component, OnInit, inject } from '@angular/core';
import { BodyComponent } from '../../../body/body.component';
import { EmployeeService } from '../../../../service/employee.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PageTitleService } from '../../../../service/page-title.service';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../../../service/service.service';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { ErrorComponent } from '../../../../template/error/error.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    ErrorComponent,
    RouterModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  providers: [
    EmployeeService,
    ServiceService
  ]
})
export class DetailComponent extends BodyComponent implements OnInit{
  
  override title = "Détail Employé";
  
  employeID: string = "";
  employee: any;
  services: any[] = [];
  employeeService = inject(EmployeeService);
  serviceService = inject(ServiceService);
  loading: boolean = false;
  error: string = "";

  constructor(private route: ActivatedRoute, pageTitleService: PageTitleService){
    super(pageTitleService);
  }

  getEmployee(){
    this.loading = true;
    this.employeID = this.route.snapshot.paramMap.get('idEmploye') ?? "";
    this.employeeService.getEmployee(this.employeID).subscribe(
      (data) =>{
        this.employee = data;
        this.loading = false;
      },
      (error) =>{
        this.error = error.error.message;
        this.loading = false;
      }
    );
  }

  getAllServices(){
    this.loading = true;
    this.serviceService.getAllServices().subscribe(
      (data) =>{
        this.services = data;
        this.loading = false;
      },
      (error) =>{
        this.error = error.error.message;
        this.loading = false;
      }
    );
  }

  ngOnInit(): void{
    this.setPageTitleService();
    this.getEmployee();
    this.getAllServices();
  }

}
