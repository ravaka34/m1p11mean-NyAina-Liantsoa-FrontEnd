import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../../../service/page-title.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { ErrorComponent } from '../../../../template/error/error.component';
import { BodyComponent } from '../../../../component/body/body.component';
import { ExpenseCategoryService } from '../../../../service/expense-category.service';

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
  loading: boolean = false;
  error: string = "";

  constructor(
    pageTitleService: PageTitleService, 
    private expenseCategoryService: ExpenseCategoryService
  ) {
    super(pageTitleService);
  }

  ngOnInit(): void {
    this.loading = true;
    this.setPageTitleService();
    this.getAllExpenseCategories();
  }

  getAllExpenseCategories() {
    this.expenseCategoryService.getAllExpenseCategories().subscribe(
      (data) => {
        this.expenseCategories = data;
        this.loading = false;
      },
      (error) => {
        this.error = error.error.message;
        this.loading = false;
      },
    );
  }

}
