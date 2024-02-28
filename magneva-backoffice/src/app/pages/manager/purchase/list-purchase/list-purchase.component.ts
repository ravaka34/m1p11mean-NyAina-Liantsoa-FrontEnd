import { Component, OnInit, inject } from '@angular/core';
import { BodyComponent } from '../../../../component/body/body.component';
import { PurchaseService } from '../../../../service/purchase.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { ErrorComponent } from '../../../../template/error/error.component';
import { SuccessComponent } from '../../../../template/success/success.component';
import { RouterModule } from '@angular/router';
import { LoaderService } from '../../../../service/loader.service';

@Component({
  selector: 'app-list-purchase',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoaderComponent,
    ErrorComponent,
    SuccessComponent,
    RouterModule
  ],
  templateUrl: './list-purchase.component.html',
  styleUrl: './list-purchase.component.css'
})
export class ListPurchaseComponent extends BodyComponent implements OnInit {

    override title = "Liste";
    purchases: any = [];

    loaderService : LoaderService = inject(LoaderService);
    purchaseService: PurchaseService = inject(PurchaseService);
  

    error: string = "";
    success: string = "";
  
    constructor() {
      super();
    }
  
    ngOnInit(): void {
      this.loaderService.showLoader();
      this.setPageTitleService();
      this.getAllPurchases();
    }
  
    applyForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      minAmount: new FormControl(''),
      maxAmount: new FormControl(''),
    });
  
    getAllPurchases() {
      const body = {
        startDate: this.applyForm.value.startDate,
        endDate: this.applyForm.value.endDate,
        minAmount: this.applyForm.value.minAmount,
        maxAmount: this.applyForm.value.maxAmount,
      };
      this.loaderService.showLoader();
      this.purchaseService.getAllPurchases(body).subscribe(
        (data) => {
          this.success = "";
          this.purchases = data;
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
  
    filter(){
      this.getAllPurchases();
    }
  
    deletePurchase(purchaseID: string){
      this.loaderService.showLoader();
      this.purchaseService.deletePurchase(purchaseID).subscribe(
        (data) => {
          this.success = "Achat supprimé avec succès.";
          this.purchases = data;
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
  
}
