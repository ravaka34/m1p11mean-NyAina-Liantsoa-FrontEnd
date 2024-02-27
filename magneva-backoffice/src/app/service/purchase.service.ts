import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  apiService : ApiService = inject(ApiService);

  constructor() { }

  getAllPurchases(body: any){
    return this.apiService.get<any[]>("/purchase/list", body);
  }
  
  createPurchase(body: any){
    return this.apiService.post<any, any>("/purchase/create", body);
  }
  
  getPurchase(id: string){
    return this.apiService.get<any[]>("/purchase/detail/"+id);
  }

  deletePurchase(id: string){
    return this.apiService.delete<any[]>("/purchase/delete/"+id);
  }
}
