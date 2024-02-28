import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { ErrorComponent } from '../../../../template/error/error.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BodyComponent } from '../../../../component/body/body.component';
import { PurchaseService } from '../../../../service/purchase.service';
import { LoaderService } from '../../../../service/loader.service';

@Component({
  selector: 'app-detail-purchase',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    ErrorComponent,
    RouterModule
  ],
  templateUrl: './detail-purchase.component.html',
  styleUrl: './detail-purchase.component.css'
})
export class DetailPurchaseComponent extends BodyComponent implements OnInit{

  loaderService : LoaderService = inject(LoaderService);
  purchaseService: PurchaseService = inject(PurchaseService);

  error: string = "";
  success: string = "";

  purchaseID: string = "";
  purchase: any;

  override title = "Détail Achat"; 

  constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.setPageTitleService();
    this.getPurchase();
}

getPurchase(){
  this.loaderService.showLoader();
  this.purchaseID = this.route.snapshot.paramMap.get('idPurchase') ?? "";
  this.purchaseService.getPurchase(this.purchaseID).subscribe(
    (data) =>{
      this.purchase = data;
      this.loaderService.hideLoader();
    },
    (error) =>{
      this.error = error.error.message;
      this.loaderService.hideLoader();
    }
  );
}

}
