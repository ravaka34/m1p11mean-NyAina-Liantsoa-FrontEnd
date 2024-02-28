import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialOfferService {

  apiService : ApiService = inject(ApiService);

  constructor() { }

  getAllSpecialOffer(){
    return this.apiService.get<any[]>("/specialOffer/list");
  }

  deleteOffer(id: string){
    return this.apiService.delete<any[]>("/specialOffer/delete/"+id);
  }

  getOffer(id: string){
    return this.apiService.get<any[]>("/specialOffer/detail/"+id);
  }

  sendMail(id: string){
    return this.apiService.get<any[]>("/specialOffer/sendMailToClients/"+id);
  }

  createOffer(body: any){
    return this.apiService.post<any, any>("/specialOffer/create", body);
  }

}
