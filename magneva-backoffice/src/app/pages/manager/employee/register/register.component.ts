import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from '../../../../service/service.service';
import { ErrorComponent } from '../../../../template/error/error.component';
import { EmployeeService } from '../../../../service/employee.service';
import { SuccessComponent } from '../../../../template/success/success.component';
import { ImageService } from '../../../../service/image.service';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { BodyComponent } from '../../../../component/body/body.component';
import { LoaderService } from '../../../../service/loader.service';

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

  loaderService : LoaderService = inject(LoaderService);
  employeeService: EmployeeService = inject(EmployeeService);
  serviceService: ServiceService = inject(ServiceService);
  imageService: ImageService = inject(ImageService);

  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
  }

  applyForm = new FormGroup({
    name: new FormControl("Rasolofoson"),
    firstName: new FormControl('Liantsoa'),
    sex: new FormControl(2),
    email: new FormControl("liantsoarasolofoson@gmail.com"),
    password: new FormControl("liantsoa123"),
    contact: new FormControl("032 44 896 35"),
    startDate: new FormControl("2024-01-01"),
    serviceCheckbox: this.formBuilder.array([])
  });
  
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
    this.loaderService.showLoader();
    this.serviceService.getAllServices().subscribe(
      (data) =>{
        this.services = data;
        this.addCheckboxes();
        this.loaderService.hideLoader();
      },
      (error) =>{
        this.error = error.error.message;
        this.loaderService.hideLoader();
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
      this.loaderService.showLoader();
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
            this.loaderService.hideLoader();
          },
          (error) =>{
            this.error = error.error.message;
            this.success = "";
            this.loaderService.hideLoader();
          }
        );
      })
      .catch(error => {
        this.error = "Une erreur s'est produite lors de la conversion du fichier en base64";
        this.success = "";
        this.loaderService.hideLoader();
      });
    }else{
      this.error = "Image requise";
      this.success = "";
    }
    
    
  }

}
