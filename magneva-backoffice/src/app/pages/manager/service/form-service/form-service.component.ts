import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from '../../../../service/service.service';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../../template/error/error.component';
import { SuccessComponent } from '../../../../template/success/success.component';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { BodyComponent } from '../../../../component/body/body.component';
import { LoaderService } from '../../../../service/loader.service';

@Component({
  selector: 'app-form-service',
  standalone: true,
  imports: [
    CommonModule,
    ErrorComponent,
    SuccessComponent,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent
  ],
  templateUrl: './form-service.component.html',
  styleUrl: './form-service.component.css'
})
export class FormServiceComponent extends BodyComponent implements OnInit{

  @Input() isCreate!: boolean;
  @Input() titleForm!: string;
  serviceID: string = "";
  service: any;

  override title: string = "";

  h4: string = "Ajouter un nouveau service";
  submit: string = "ENREGISTRER";

  loaderService : LoaderService = inject(LoaderService);
  serviceService: ServiceService = inject(ServiceService);

  error: string = "";
  success: string = "";

  imageDataUrl: string | null = null;

  applyForm = new FormGroup({
    name: new FormControl("Faux Ongles"),
    price: new FormControl('10000'),
    duree: new FormControl('02:00'),
    commission: new FormControl("10"),
    description: new FormControl("descriptions")
  });

  constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void{
    this.title = this.titleForm;
    this.setPageTitleService();
    if(!this.isCreate){
      this.getService();
    }
  }
  
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const droppedFile = files[0];
      if (droppedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageDataUrl = reader.result as string;
        };
        reader.readAsDataURL(droppedFile);
      }else {
        this.error = "Le fichier déposé n\'est pas une image.";
        this.success = "";
      }
    }
  }

  getService(){
    this.loaderService.showLoader();
    this.serviceID = this.route.snapshot.paramMap.get('idService') ?? "";
    this.serviceService.getService(this.serviceID).subscribe(
      (data) =>{
        this.service = data;
        this.applyForm.patchValue({
          name: this.service.name,
          price: this.service.price,
          duree: moment(this.service.duration, "HHmm").format("HH:mm"),
          commission: this.service.commission,
          description: this.service.description
        });
        this.imageDataUrl = this.service.picture;
        this.h4 = "Modifier un service";
        this.submit = "MODIFIER";
        this.loaderService.hideLoader();
      },
      (error) =>{
        this.error = error.error.message;
        this.loaderService.hideLoader();
      }
    );
  }

  submitForm(){
    const body = {
      name: this.applyForm.value.name,
      price: this.applyForm.value.price,
      commission: this.applyForm.value.commission,
      description: this.applyForm.value.description,
      picture: this.imageDataUrl,
      duree: this.applyForm.value.duree
    }
    console.log(body);

    this.loaderService.showLoader();
    if(this.isCreate){
      this.serviceService.createService(body).subscribe(
        (data) =>{
          this.success = "Service créé avec succès!";
          this.error = "";
          this.loaderService.hideLoader();
        },
        (error) =>{
          this.error = error.error.message;
          this.success = "";
          this.loaderService.hideLoader();
        }
      );
    }else{
      this.serviceService.updateService(this.serviceID, body).subscribe(
        (data) =>{
          this.success = "Service créé avec succès!";
          this.error = "";
          this.loaderService.hideLoader();
        },
        (error) =>{
          this.error = error.error.message;
          this.success = "";
          this.loaderService.hideLoader();
        }
      );
    }
  }

}
