import { Component, OnInit } from '@angular/core';
import { BodyComponent } from '../../../../component/body/body.component';
import { PageTitleService } from '../../../../service/page-title.service';
import { ExpenseService } from '../../../../service/expense.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpenseCategoryService } from '../../../../service/expense-category.service';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../../template/error/error.component';
import { SuccessComponent } from '../../../../template/success/success.component';
import { LoaderComponent } from '../../../../template/loader/loader.component';

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
  
  loading: boolean = false;
  error: string = "";
  success: string = "";

  expenseCategories: any[] = [];

  applyForm = new FormGroup({
    date: new FormControl(''),
    amount: new FormControl(''),
    motif: new FormControl(''),
    expenseCategory: new FormControl('')
  });

  constructor(
    pageTitleService: PageTitleService,
    private expenseService: ExpenseService,
    private expenseCategoryService: ExpenseCategoryService
  ) {
    super(pageTitleService);
  }

  ngOnInit(): void {
    this.setPageTitleService();
    this.getAllExpenseCategory();
  }

  getAllExpenseCategory(){
    this.loading = true;
    this.expenseCategoryService.getAllExpenseCategories().subscribe(
      (data) =>{
        this.expenseCategories = data;
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
    const body = {
      date: this.applyForm.value.date,
      amount: this.applyForm.value.amount,
      motif: this.applyForm.value.motif,
      expenseCategory: this.applyForm.value.expenseCategory
    }
    this.loading = true;
    this.expenseService.createExpense(body).subscribe(
      (data) =>{
        this.success = "Dépense créée avec succès!";
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
