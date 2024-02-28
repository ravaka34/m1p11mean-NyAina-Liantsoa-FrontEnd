import { Component, Input, OnInit, inject } from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { EmployeeService } from '../../service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from '../../template/success/success.component';
import { ErrorComponent } from '../../template/error/error.component';
import { LoaderComponent } from '../../template/loader/loader.component';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-update-mdp-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SuccessComponent,
    ErrorComponent,
    LoaderComponent
  ],
  templateUrl: './update-mdp-employee.component.html',
  styleUrl: './update-mdp-employee.component.css',
  providers: [
    EmployeeService
  ]
})
export class UpdateMdpEmployeeComponent extends BodyComponent implements OnInit{

  override title: string = "Modifier mot de passe";

  @Input() isManager!: boolean;
  
  employeID: string = "";
  employeeService : EmployeeService = inject(EmployeeService);
  loaderService : LoaderService = inject(LoaderService);
  error: string = "";
  success: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ){
    super();
  }

  ngOnInit(): void {
    this.setPageTitleService();
  }

  applyForm = new FormGroup({
    lastPassword: new FormControl(''),
    password: new FormControl('')
  });

  showPassword: boolean = false;
  showLastPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleLastPassword() {
    this.showLastPassword = !this.showLastPassword;
  }

  updatePassword(){
    this.loaderService.showLoader();
    this.employeID = this.route.snapshot.paramMap.get('idEmploye') ?? "";
    const body = {
      lastPassword: this.applyForm.value.lastPassword,
      password: this.applyForm.value.password,
    }
    this.employeeService.updatePassword(this.employeID, body).subscribe(
      (data) =>{
        this.loaderService.hideLoader();
        if(this.isManager){
          this.success = "Mot de passe changé avec succès!";
          this.error = "";
        }
        else{
          this.router.navigate(["/connexion"]);
        }
      },
      (error) =>{
        this.error = error.error.message;
        this.success = "";
        this.loaderService.hideLoader();
      }
    );
  };


}
