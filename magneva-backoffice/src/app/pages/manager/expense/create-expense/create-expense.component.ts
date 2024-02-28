import { Component, OnInit, inject } from '@angular/core';
import { BodyComponent } from '../../../../component/body/body.component';
import { ExpenseService } from '../../../../service/expense.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpenseCategoryService } from '../../../../service/expense-category.service';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../../template/error/error.component';
import { SuccessComponent } from '../../../../template/success/success.component';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { LoaderService } from '../../../../service/loader.service';

@Component({
  selector: 'app-create-expense',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorComponent,
    SuccessComponent,
    LoaderComponent
  ],
  templateUrl: './create-expense.component.html',
  styleUrl: './create-expense.component.css',
  providers: [
    ExpenseService,
    ExpenseCategoryService
  ]
})
export class CreateExpenseComponent extends BodyComponent implements OnInit{

  override title: string = "Nouvelle dépense";
  
  loaderService : LoaderService = inject(LoaderService);
  expenseService: ExpenseService = inject(ExpenseService);
  expenseCategoryService: ExpenseCategoryService = inject(ExpenseCategoryService);

  error: string = "";
  success: string = "";

  expenseCategories: any[] = [];

  applyForm = new FormGroup({
    date: new FormControl(''),
    amount: new FormControl(''),
    motif: new FormControl(''),
    expenseCategory: new FormControl('')
  });

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.setPageTitleService();
    this.getAllExpenseCategory();
  }

  getAllExpenseCategory(){
    this.loaderService.showLoader();
    this.expenseCategoryService.getAllExpenseCategories().subscribe(
      (data) =>{
        this.expenseCategories = data;
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
    const body = {
      date: this.applyForm.value.date,
      amount: this.applyForm.value.amount,
      motif: this.applyForm.value.motif,
      expenseCategory: this.applyForm.value.expenseCategory
    }
    this.loaderService.showLoader();
    this.expenseService.createExpense(body).subscribe(
      (data) =>{
        this.success = "Dépense créée avec succès!";
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
