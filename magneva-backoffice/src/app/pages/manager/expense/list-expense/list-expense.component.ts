import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { ErrorComponent } from '../../../../template/error/error.component';
import { BodyComponent } from '../../../../component/body/body.component';
import { ExpenseService } from '../../../../service/expense.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SuccessComponent } from '../../../../template/success/success.component';
import { LoaderService } from '../../../../service/loader.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoaderComponent,
    ErrorComponent,
    ReactiveFormsModule,
    SuccessComponent
  ],
  templateUrl: './list-expense.component.html',
  styleUrl: './list-expense.component.css',
  providers: [
    ExpenseService
  ]
})
export class ListExpenseComponent extends BodyComponent implements OnInit {

  override title = "Liste";
  expenses: any = [];

  loaderService : LoaderService = inject(LoaderService);
  expenseService: ExpenseService = inject(ExpenseService);

  error: string = "";
  success: string = "";

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.setPageTitleService();
    this.getAllExpenses();
  }

  applyForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    expenseCategoryName: new FormControl(''),
    expenseCategoryType: new FormControl()
  });

  types = [
    {"value": 1, "name": "Mensuelle"},
    {"value": 2, "name": "Autres dépenses"}
  ];

  getAllExpenses() {
    const body = {
      startDate: this.applyForm.value.startDate,
      endDate: this.applyForm.value.endDate,
      expenseCategoryName: this.applyForm.value.expenseCategoryName,
      expenseCategoryType: this.applyForm.value.expenseCategoryType
    };
    this.loaderService.showLoader();
    this.expenseService.getAllExpenses(body).subscribe(
      (data) => {
        this.success = "";
        this.expenses = data;
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
    this.getAllExpenses();
  }

  deleteExpense(expenseID: string){
    console.log(expenseID);
    this.loaderService.showLoader();
    this.expenseService.deleteExpense(expenseID).subscribe(
      (data) => {
        this.success = "Dépense supprimée avec succès.";
        this.expenses = data;
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
