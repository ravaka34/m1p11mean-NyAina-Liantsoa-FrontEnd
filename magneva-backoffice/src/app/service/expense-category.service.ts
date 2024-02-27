import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoryService {
  apiService : ApiService = inject(ApiService);

  constructor() { }

  getAllExpenseCategories(){
    return this.apiService.get<any[]>("/expense/expenseCategory/list");
  }
  
  createExpenseCategory(body: any){
    return this.apiService.post<any, any>("/expense/expenseCategory/create", body);
  }
}
