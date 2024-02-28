import { Component, OnInit, inject } from '@angular/core';
import { BodyComponent } from '../../../../component/body/body.component';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../../template/error/error.component';
import { SuccessComponent } from '../../../../template/success/success.component';
import { RouterModule } from '@angular/router';
import { SpecialOfferService } from '../../../../service/special-offer.service';
import { LoaderService } from '../../../../service/loader.service';
import { HeureService } from '../../../../service/heure.service';

@Component({
  selector: 'app-list-offer',
  standalone: true,
  imports: [
    CommonModule,
    ErrorComponent,
    SuccessComponent,
    RouterModule
  ],
  templateUrl: './list-offer.component.html',
  styleUrl: './list-offer.component.css'
})
export class ListOfferComponent extends BodyComponent implements OnInit {

  override title = "Liste";
  offers: any[] = [];

  loaderService : LoaderService = inject(LoaderService);
  specialOfferService: SpecialOfferService = inject(SpecialOfferService);
  heureService: HeureService = inject(HeureService);

  error: string = "";
  success: string = "";

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.setPageTitleService();
    this.getAllOffer();
  }

  getAllOffer() {
    this.loaderService.showLoader();
    this.specialOfferService.getAllSpecialOffer().subscribe(
      (data) => {
        this.success = "";
        this.offers = data;
        this.loaderService.hideLoader();
        this.error = "";
      },
      (error) => {
        this.success = "";
        this.error = error.error.message;
        this.loaderService.hideLoader();
      },
    );
  }

  deleteOffer(offerID: string){
    this.loaderService.showLoader();
    this.specialOfferService.deleteOffer(offerID).subscribe(
      (data) => {
        this.success = "Offre supprimée avec succès.";
        this.offers = data;
        this.loaderService.hideLoader();
        this.error = "";
      },
      (error) => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
        this.success = "";
      },
    );
  }

  formatHour(hour: Number) {
    return this.heureService.formatHour(hour);
  }
}
