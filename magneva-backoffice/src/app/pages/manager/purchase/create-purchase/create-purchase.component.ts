import { Component, OnInit } from '@angular/core';
import { BodyComponent } from '../../../../component/body/body.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PageTitleService } from '../../../../service/page-title.service';
import { PurchaseService } from '../../../../service/purchase.service';
import { PieceService } from '../../../../service/piece.service';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../../template/error/error.component';
import { SuccessComponent } from '../../../../template/success/success.component';
import { LoaderComponent } from '../../../../template/loader/loader.component';

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
  
  loading: boolean = false;
  error: string = "";
  success: string = "";

  pieces: any[] = [];
  details: any[] = [{ id: 1 }];
  rowData: any[] = [];

  applyForm = new FormGroup({
    date: new FormControl('')
  });

  constructor(
    pageTitleService: PageTitleService,
    private purchaseService: PurchaseService,
    private pieceService: PieceService,
  ) {
    super(pageTitleService);
  }

  ngOnInit(): void {
    this.setPageTitleService();
    this.getAllPieces();
  }

  getAllPieces(){
    this.loading = true;
    this.pieceService.getAllPieces().subscribe(
      (data) =>{
        this.pieces = data;
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

  submitForm(){
    this.getAllRowValues();
    const body = {
      date: this.applyForm.value.date,
      details: this.rowData
    };
    this.loading = true;
    this.purchaseService.createPurchase(body).subscribe(
      (data) =>{
        this.success = "Achat créé avec succès!";
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
