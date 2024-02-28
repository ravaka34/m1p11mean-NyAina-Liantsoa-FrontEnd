import { Component, OnInit, inject } from '@angular/core';
import { BodyComponent } from '../../../../component/body/body.component';
import { LoaderService } from '../../../../service/loader.service';
import { SpecialOfferService } from '../../../../service/special-offer.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeureService } from '../../../../service/heure.service';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../../template/error/error.component';
import { SuccessComponent } from '../../../../template/success/success.component';

@Component({
  selector: 'app-detail-offer',
  standalone: true,
  imports: [
    CommonModule,
    ErrorComponent,
    RouterModule,
    SuccessComponent
  ],
  templateUrl: './detail-offer.component.html',
  styleUrl: './detail-offer.component.css'
})
export class DetailOfferComponent extends BodyComponent implements OnInit{

  loaderService : LoaderService = inject(LoaderService);
  specialOfferService: SpecialOfferService = inject(SpecialOfferService);
  heureService: HeureService = inject(HeureService);

  error: string = "";
  success: string = "";

  offerID: string = "";
  offer: any;

  override title = "Détail offre spéciale"; 

  constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.offerID = this.route.snapshot.paramMap.get('idOffer') ?? "";
    this.setPageTitleService();
    this.getOffer();
  }

  formatHour(hour: Number) {
    return this.heureService.formatHour(hour);
  }

  getOffer(){
    this.loaderService.showLoader();
    this.specialOfferService.getOffer(this.offerID).subscribe(
      (data) =>{
        this.offer = data;
        this.loaderService.hideLoader();
      },
      (error) =>{
        this.error = error.error.message;
        this.loaderService.hideLoader();
      }
    );
  }

  sendMail(){
    this.loaderService.showLoader();
    this.specialOfferService.sendMail(this.offerID).subscribe(
      (data) =>{
        this.offer = data;
        this.success = "Mail envoyé avec succès aux clients!";
        this.error = "";
        this.loaderService.hideLoader();
      },
      (error) =>{
        this.success = "";
        this.error = error.error.message;
        this.loaderService.hideLoader();
  
      }
    );
  }

}
