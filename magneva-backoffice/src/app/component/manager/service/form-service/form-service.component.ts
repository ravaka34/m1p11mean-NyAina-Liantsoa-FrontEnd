import { Component, Input, OnInit } from '@angular/core';
import { BodyComponent } from '../../../body/body.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTitleService } from '../../../../service/page-title.service';
import { ServiceService } from '../../../../service/service.service';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../../template/error/error.component';
import { SuccessComponent } from '../../../../template/success/success.component';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';

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
  loading: boolean = false;
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
    pageTitleService: PageTitleService,
    private serviceService: ServiceService,
    private route: ActivatedRoute
  ) {
    super(pageTitleService);
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
    this.loading = true;
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
        this.loading = false;
      },
      (error) =>{
        this.error = error.error.message;
        this.loading = false;
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

    this.loading = true;
    if(this.isCreate){
      this.serviceService.createService(body).subscribe(
        (data) =>{
          this.success = "Service créé avec succès!";
          this.error = "";
          this.loading = false;
        },
        (error) =>{
          this.error = error.error.message;
          this.success = "";
          this.loading = false;
        }
      );
    }else{
      this.serviceService.updateService(this.serviceID, body).subscribe(
        (data) =>{
          this.success = "Service créé avec succès!";
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

}
