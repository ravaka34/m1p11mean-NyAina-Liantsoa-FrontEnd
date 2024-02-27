import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { ErrorComponent } from '../../../../template/error/error.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BodyComponent } from '../../../../component/body/body.component';
import { PageTitleService } from '../../../../service/page-title.service';
import { PurchaseService } from '../../../../service/purchase.service';

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

  loading: boolean = false;
  error: string = "";
  success: string = "";

  purchaseID: string = "";
  purchase: any;

  override title = "Détail Achat"; 

  constructor(
    pageTitleService: PageTitleService,
    private purchaseService: PurchaseService,
    private route: ActivatedRoute
  ) {
    super(pageTitleService);
  }

  ngOnInit(): void {
    this.setPageTitleService();
    this.getPurchase();
}

getPurchase(){
  this.loading = true;
  this.purchaseID = this.route.snapshot.paramMap.get('idPurchase') ?? "";
  this.purchaseService.getPurchase(this.purchaseID).subscribe(
    (data) =>{
      this.purchase = data;
      this.loading = false;
    },
    (error) =>{
      this.error = error.error.message;
      this.loading = false;
    }
  );
}

}
