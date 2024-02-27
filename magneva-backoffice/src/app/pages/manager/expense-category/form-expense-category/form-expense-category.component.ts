import { Component, Input, OnInit } from '@angular/core';
import { BodyComponent } from '../../../../component/body/body.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTitleService } from '../../../../service/page-title.service';
import { ErrorComponent } from '../../../../template/error/error.component';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from '../../../../template/success/success.component';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { ExpenseCategoryService } from '../../../../service/expense-category.service';

@Component({
  selector: 'app-form-expense-category',
  standalone: true,
  imports: [
    CommonModule,
    ErrorComponent,
    SuccessComponent,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent
  ],
  templateUrl: './form-expense-category.component.html',
  styleUrl: './form-expense-category.component.css',
  providers: [
    ExpenseCategoryService
  ]
})
export class FormExpenseCategoryComponent extends BodyComponent implements OnInit{

  @Input() isCreate! : boolean;
  @Input() titleForm!: string;

  expenseCategory: any;
  loading: boolean = false;
  error: string = "";
  success: string = "";

  h4: string = "Ajouter un nouveau type de dépense";
  submit: string = "ENREGISTRER";

  applyForm = new FormGroup({
    name: new FormControl("Wifi"),
    type: new FormControl(1)
  });

  constructor(
    pageTitleService: PageTitleService,
    private expenseCategoryService: ExpenseCategoryService
  ) {
    super(pageTitleService);
  }

  ngOnInit(): void {
    this.title = this.titleForm;
    this.setPageTitleService();
  }

  types = [
    {"value": 1, "name": "Mensuelle"},
    {"value": 2, "name": "Autres dépenses"}
  ];

  submitForm(){
    const body = {
      name: this.applyForm.value.name,
      type: this.applyForm.value.type
    }
    this.loading = true;
    if(this.isCreate){
      this.expenseCategoryService.createExpenseCategory(body).subscribe(
        (data) =>{
          this.success = "Type dépense créé avec succès!";
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
