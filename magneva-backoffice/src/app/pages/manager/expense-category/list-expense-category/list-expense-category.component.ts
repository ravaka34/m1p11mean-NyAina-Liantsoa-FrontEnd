import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { ErrorComponent } from '../../../../template/error/error.component';
import { BodyComponent } from '../../../../component/body/body.component';
import { ExpenseCategoryService } from '../../../../service/expense-category.service';
import { LoaderService } from '../../../../service/loader.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoaderComponent,
    ErrorComponent
  ],
  templateUrl: './list-expense-category.component.html',
  styleUrl: './list-expense-category.component.css',
  providers: [
    ExpenseCategoryService
  ]
})
export class ListExpenseCategoryComponent extends BodyComponent implements OnInit {

  override title = "Liste";
  expenseCategories: any = [];

  loaderService : LoaderService = inject(LoaderService);
  expenseCategoryService: ExpenseCategoryService = inject(ExpenseCategoryService);

  error: string = "";

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.setPageTitleService();
    this.getAllExpenseCategories();
  }

  getAllExpenseCategories() {
    this.expenseCategoryService.getAllExpenseCategories().subscribe(
      (data) => {
        this.expenseCategories = data;
        this.loaderService.hideLoader();
      },
      (error) => {
        this.error = error.error.message;
        this.loaderService.hideLoader();
      },
    );
  }

}
