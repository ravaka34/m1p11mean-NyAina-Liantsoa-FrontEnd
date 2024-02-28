import { Component, Input, OnInit, inject } from '@angular/core';
import { BodyComponent } from '../../../../component/body/body.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from '../../../../template/error/error.component';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from '../../../../template/success/success.component';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { PieceService } from '../../../../service/piece.service';
import { LoaderService } from '../../../../service/loader.service';

@Component({
  selector: 'app-form-piece',
  standalone: true,
  imports: [
    CommonModule,
    ErrorComponent,
    SuccessComponent,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent
  ],
  templateUrl: './form-piece.component.html',
  styleUrl: './form-piece.component.css',
  providers: [
    PieceService
  ]
})
export class FormPieceComponent extends BodyComponent implements OnInit{

  @Input() isCreate! : boolean;
  @Input() titleForm!: string;

  expenseCategory: any;

  loaderService : LoaderService = inject(LoaderService);
  pieceService: PieceService = inject(PieceService);

  error: string = "";
  success: string = "";

  h4: string = "Ajouter une nouvelle pièce";
  submit: string = "ENREGISTRER";

  applyForm = new FormGroup({
    name: new FormControl('')
  });

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.title = this.titleForm;
    this.setPageTitleService();
  }

  submitForm(){
    const body = {
      name: this.applyForm.value.name
    }
    this.loaderService.showLoader();
    if(this.isCreate){
      this.pieceService.createPiece(body).subscribe(
        (data) =>{
          this.success = "Pièce créée avec succès!";
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
