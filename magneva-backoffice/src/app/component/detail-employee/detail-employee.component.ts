import { Component, Input, OnInit, inject } from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { EmployeeService } from '../../service/employee.service';
import { ServiceService } from '../../service/service.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PageTitleService } from '../../service/page-title.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../template/loader/loader.component';
import { ErrorComponent } from '../../template/error/error.component';
import { SuccessComponent } from '../../template/success/success.component';

@Component({
  selector: 'app-detail-employee',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    ErrorComponent,
    RouterModule,
    SuccessComponent
  ],
  templateUrl: './detail-employee.component.html',
  styleUrl: './detail-employee.component.css',
  providers: [
    EmployeeService,
    ServiceService
  ]
})
export class DetailEmployeeComponent extends BodyComponent implements OnInit{
  
  override title = "Détail Employé";
  
  @Input() isManager!: boolean;
  
  employeID: string = "";
  employee: any;
  services: any[] = [];
  employeeService = inject(EmployeeService);
  serviceService = inject(ServiceService);
  loading: boolean = false;
  error: string = "";
  errorService: string = "";
  success: string = "";

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

  actionService(serviceID: string, isAddService: boolean){
    if( isAddService ){
      var selectID = document.getElementById('serviceSelect') as HTMLInputElement;
      serviceID = selectID.value;
    }
    const body = {
      serviceEmployeeID: this.employee.info._id,
      serviceID: serviceID
    };
    this.loading = true;
    this.employeeService.removeOrAddService(this.employee.info.employee._id, body, isAddService).subscribe(
      (data) =>{
        this.employee = data;
        this.loading = false;
        if( isAddService ){
          this.success = "Ajout effectué avec succès.";
        }else{
          this.success = "Service supprimé avec succès.";
        }
        this.errorService = "";
        this.error = "";
      },
      (error) =>{
        this.errorService = error.error.message;
        this.loading = false;
        this.success = "";
        this.error = "";
      }
    );
  }

}
