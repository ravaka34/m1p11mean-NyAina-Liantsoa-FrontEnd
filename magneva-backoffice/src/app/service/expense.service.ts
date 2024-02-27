import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  apiService : ApiService = inject(ApiService);

  constructor() { }

  getAllExpenses(body: any){
    return this.apiService.get<any[]>("/expense/list", body);
  }
  
  createExpense(body: any){
    return this.apiService.post<any, any>("/expense/create", body);
  }

  deleteExpense(expenseID: string){
    return this.apiService.delete<any>("/expense/delete/"+expenseID);
  }
}
