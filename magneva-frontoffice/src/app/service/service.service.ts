import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiService : ApiService = inject(ApiService);

  constructor() { }

  getAllServices(){
    return this.apiService.get<any[]>("/service/list");
  }

  getAllServicesWithReviews(){
    return this.apiService.get<any[]>("/review/services");
  }
}
