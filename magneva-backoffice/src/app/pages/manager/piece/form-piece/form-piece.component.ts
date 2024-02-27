import { Component, Input, OnInit } from '@angular/core';
import { BodyComponent } from '../../../../component/body/body.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTitleService } from '../../../../service/page-title.service';
import { ErrorComponent } from '../../../../template/error/error.component';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from '../../../../template/success/success.component';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { PieceService } from '../../../../service/piece.service';

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
  loading: boolean = false;
  error: string = "";
  success: string = "";

  h4: string = "Ajouter une nouvelle pièce";
  submit: string = "ENREGISTRER";

  applyForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(
    pageTitleService: PageTitleService,
    private pieceService: PieceService
  ) {
    super(pageTitleService);
  }

  ngOnInit(): void {
    this.title = this.titleForm;
    this.setPageTitleService();
  }

  submitForm(){
    const body = {
      name: this.applyForm.value.name
    }
    this.loading = true;
    if(this.isCreate){
      this.pieceService.createPiece(body).subscribe(
        (data) =>{
          this.success = "Pièce créée avec succès!";
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
