import { Component, OnInit, inject } from '@angular/core';
import { BodyComponent } from '../../../../component/body/body.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PurchaseService } from '../../../../service/purchase.service';
import { PieceService } from '../../../../service/piece.service';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../../template/error/error.component';
import { SuccessComponent } from '../../../../template/success/success.component';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { LoaderService } from '../../../../service/loader.service';

@Component({
  selector: 'app-create-purchase',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorComponent,
    SuccessComponent,
    LoaderComponent
  ],
  templateUrl: './create-purchase.component.html',
  styleUrl: './create-purchase.component.css',
  providers:[
    PieceService,
    PurchaseService
  ]
})
export class CreatePurchaseComponent extends BodyComponent implements OnInit{

  override title: string = "Nouveau achat";
  
  loaderService : LoaderService = inject(LoaderService);
  purchaseService: PurchaseService = inject(PurchaseService);
  pieceService: PieceService = inject(PieceService);

  error: string = "";
  success: string = "";

  pieces: any[] = [];
  details: any[] = [{ id: 1 }];
  rowData: any[] = [];

  applyForm = new FormGroup({
    date: new FormControl('')
  });

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.setPageTitleService();
    this.getAllPieces();
  }

  getAllPieces(){
    this.loaderService.showLoader();
    this.pieceService.getAllPieces().subscribe(
      (data) =>{
        this.pieces = data;
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
    this.getAllRowValues();
    const body = {
      date: this.applyForm.value.date,
      details: this.rowData
    };
    this.loaderService.showLoader();
    this.purchaseService.createPurchase(body).subscribe(
      (data) =>{
        this.success = "Achat créé avec succès!";
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

  addRowDetail() {
    this.details.push({ id: this.details.length + 1 }); // Ajoute un nouveau détail à la liste
  }

  removeRowDetail(index: number) {
    this.details.splice(index, 1); // Supprime la rangée à l'index spécifié
  }

  getAllRowValues() {
    this.rowData = [];
    this.details.forEach(detail => {
      const pieceElement = document.getElementById('piece_' + detail.id) as HTMLSelectElement;
      const quantityElement = document.getElementById('quantity_' + detail.id) as HTMLInputElement;
      const unitPriceElement = document.getElementById('unitPrice_' + detail.id) as HTMLInputElement;
      
      const piece = pieceElement.value;
      const quantity = quantityElement.value;
      const unitPrice = unitPriceElement.value;
  
      this.rowData.push({ piece, quantity, unitPrice });
    });
    console.log(this.rowData);
  }
}
