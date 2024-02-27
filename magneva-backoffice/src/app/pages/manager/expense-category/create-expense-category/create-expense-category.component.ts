import { Component } from '@angular/core';
import { FormExpenseCategoryComponent } from '../form-expense-category/form-expense-category.component';

@Component({
  selector: 'app-create-expense-category',
  standalone: true,
  imports: [
    FormExpenseCategoryComponent
  ],
  templateUrl: './create-expense-category.component.html',
  styleUrl: './create-expense-category.component.css'
})
export class CreateExpenseCategoryComponent {

  isCreate: boolean = true;
  titleForm: string = "Nouveau type de dépense";
}
