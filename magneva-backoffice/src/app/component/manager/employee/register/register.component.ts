import { Component, OnInit, inject } from '@angular/core';
import { BodyComponent } from '../../../body/body.component';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from '../../../../service/service.service';
import { ErrorComponent } from '../../../error/error.component';
import { PageTitleService } from '../../../../service/page-title.service';
import { EmployeeService } from '../../../../service/employee.service';
import { SuccessComponent } from '../../../success/success.component';
import { ImageService } from '../../../../service/image.service';
import { LoaderComponent } from '../../../../template/loader/loader.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorComponent,
    SuccessComponent,
    LoaderComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [
    EmployeeService,
    ServiceService
  ]
})
export class RegisterComponent extends BodyComponent implements OnInit{

  override title = "Inscription";

  services: any[] = [];

  constructor(
    pageTitleService: PageTitleService, 
    private employeeService: EmployeeService,
    private serviceService: ServiceService,
    private formBuilder: FormBuilder,
    private imageService: ImageService
  ) {
    super(pageTitleService);
  }

  applyForm = new FormGroup({
    name: new FormControl("Rasoa"),
    firstName: new FormControl('Kathy'),
    sex: new FormControl(2),
    email: new FormControl("kathyrasoa@gmail.com"),
    password: new FormControl("kathy123"),
    contact: new FormControl("0324489635"),
    startDate: new FormControl("2024-01-01"),
    serviceCheckbox: this.formBuilder.array([])
  });
  
  loading: boolean = false;
  error: string = "";
  success: string = "";

  genres = [
    {"value": 1, "name": "Homme"},
    {"value": 2, "name": "Femme"}
  ];

  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  getAllServices(){
    this.loading = true;
    this.serviceService.getAllServices().subscribe(
      (data) =>{
        this.services = data;
        this.addCheckboxes();
        this.loading = false;
      },
      (error) =>{
        this.error = error.error.message;
        this.loading = false;
      }
    );
  }

  private addCheckboxes() {
    const control = this.applyForm.get('serviceCheckbox') as FormArray;
    this.services.forEach(() => control.push(this.formBuilder.control(false)));
  }

  get serviceCheckboxArray() {
    return (this.applyForm.get('serviceCheckbox') as FormArray).controls;
  }

  ngOnInit(): void{
    this.setPageTitleService();
    this.getAllServices();
  }

  async createEmployee(){

    const selectedServiceIds = this.serviceCheckboxArray
      .map((control, index) => control.value ? this.services[index]._id : null)
      .filter(value => value !== null)
    ;

    const fileInput = document.getElementById('picture') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      this.loading = true;
      const file = fileInput.files[0];
      await this.imageService.fileToBase64(file).then((base64String: string | null) => {
        const body = {
          name: this.applyForm.value.name,
          firstName: this.applyForm.value.firstName,
          sex: this.applyForm.value.sex,
          email: this.applyForm.value.email,
          password: this.applyForm.value.password,
          contact: this.applyForm.value.contact,
          roles: ["employee"],
          startDate: this.applyForm.value.startDate,
          picture: base64String,
          services: selectedServiceIds
        }
        this.employeeService.createEmployee(body).subscribe(
          (data) =>{
            this.success = "Employé(e) créé(e) avec succès!";
            this.error = "";
            this.loading = false;
          },
          (error) =>{
            this.error = error.error.message;
            this.success = "";
            this.loading = false;
          }
        );
      })
      .catch(error => {
        this.error = "Une erreur s'est produite lors de la conversion du fichier en base64";
        this.success = "";
        this.loading = false;
      });
    }else{
      this.error = "Image requise";
      this.success = "";
    }
    
    
  }

}
