import { Component, OnInit, inject } from '@angular/core';
import { BodyComponent } from '../../../../component/body/body.component';
import { LoaderService } from '../../../../service/loader.service';
import { SpecialOfferService } from '../../../../service/special-offer.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from '../../../../service/service.service';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../../template/error/error.component';
import { SuccessComponent } from '../../../../template/success/success.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-create-offer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorComponent,
    SuccessComponent,
    CKEditorModule
  ],
  templateUrl: './create-offer.component.html',
  styleUrl: './create-offer.component.css'
})
export class CreateOfferComponent extends BodyComponent implements OnInit{

  override title: string = "Nouvelle offre spéciale";
  
  loaderService : LoaderService = inject(LoaderService);
  specialOfferService : SpecialOfferService = inject(SpecialOfferService);
  serviceService : ServiceService = inject(ServiceService);

  error: string = "";
  success: string = "";

  services: any[] = [];

  applyForm = new FormGroup({
    service: new FormControl(''),
    percentage: new FormControl(''),
    description: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });

  constructor() {
    super();
  }

  ngOnInit() : void{
    this.setPageTitleService();
    this.getAllServices();
  }

  getAllServices(){
    this.loaderService.showLoader();
    this.serviceService.getAllServices().subscribe(
      (data) =>{
        this.services = data;
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

  submitForm(){
    const body = {
      service: this.applyForm.value.service,
      percentage: this.applyForm.value.percentage,
      description: this.applyForm.value.description,
      startDate: this.applyForm.value.startDate,
      endDate: this.applyForm.value.endDate
    }
    this.loaderService.showLoader();
    this.specialOfferService.createOffer(body).subscribe(
      (data) =>{
        this.success = "Offre créée avec succès!";
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

