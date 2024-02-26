import { Component, Input, OnInit, inject } from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { EmployeeService } from '../../service/employee.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SuccessComponent } from '../../template/success/success.component';
import { ErrorComponent } from '../../template/error/error.component';
import { LoaderComponent } from '../../template/loader/loader.component';
import { ActivatedRoute } from '@angular/router';
import { PageTitleService } from '../../service/page-title.service';
import { ImageService } from '../../service/image.service';
import moment from 'moment';

@Component({
  selector: 'app-update-profil-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SuccessComponent,
    ErrorComponent,
    LoaderComponent
  ],
  templateUrl: './update-profil-employee.component.html',
  styleUrl: './update-profil-employee.component.css',
  providers: [
    EmployeeService
  ]
})
export class UpdateProfilEmployeeComponent extends BodyComponent implements OnInit{

  override title: string = "Modifier profil";
  
  employeID: string = "";
  employee: any;
  imageURL: string = "";
  employeeService = inject(EmployeeService);
  imageService = inject(ImageService);
  loading: boolean = false;
  error: string = "";
  success: string = "";

  genres = [
    {"value": 1, "name": "Homme"},
    {"value": 2, "name": "Femme"}
  ];

  constructor(
    private route: ActivatedRoute, 
    pageTitleService: PageTitleService
  ){
    super(pageTitleService);
  }

  ngOnInit(): void {
    this.setPageTitleService();
    this.getEmployee();
  }

  applyForm = new FormGroup({
    name: new FormControl(''),
    firstName: new FormControl(''),
    sex: new FormControl(1),
    email: new FormControl(''),
    contact: new FormControl(''),
    startDate: new FormControl('')
  });

  getEmployee(){
    this.loading = true;
    this.employeID = this.route.snapshot.paramMap.get('idEmploye') ?? "";
    this.employeeService.getEmployee(this.employeID).subscribe(
      (data) =>{
        this.employee = data;
        console.log(this.employee.info.employee.startDate);
        this.applyForm.patchValue({
          name: this.employee.info.employee.name,
          firstName: this.employee.info.employee.firstName,
          sex: this.employee.info.employee.sex,
          email: this.employee.info.employee.email,
          contact: this.employee.info.employee.contact,
          startDate: moment(new Date(this.employee.info.employee.startDate)).format('YYYY-MM-DD')
        });
        this.imageURL = this.employee.info.employee.picture;
        this.loading = false;
      },
      (error) =>{
        this.error = error.error.message;
        this.loading = false;
      }
    );
  }

  async onChangePicture(){
    const fileInput = document.getElementById('picture') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      await this.imageService.fileToBase64(file).then((base64String: string | null) => {
        if (base64String !== null) {
          this.imageURL = base64String;
        }
      })
      .catch(error => {
        this.error = "Une erreur s'est produite lors de la conversion du fichier en base64";
        this.success = "";
        this.loading = false;
      });
    }
  }

  updateEmployee(){
    this.loading = true;
    const body = {
      name: this.applyForm.value.name,
      firstName: this.applyForm.value.firstName,
      sex: this.applyForm.value.sex,
      email: this.applyForm.value.email,
      contact: this.applyForm.value.contact,
      startDate: this.applyForm.value.startDate,
      picture: this.imageURL,
    }
    this.employeeService.updateProfil(this.employeID, body).subscribe(
      (data) =>{
        this.success = "Modification effectuée avec succès!";
        this.error = "";
        this.loading = false;
      },
      (error) =>{
        this.error = error.error.message;
        this.success = "";
        this.loading = false;
      }
    );
  }

}
