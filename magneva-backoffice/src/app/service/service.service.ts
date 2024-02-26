import { Injectable, inject } from '@angular/core';
import { environnement } from '../../environnement/environnement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  getService(id: string){
    return this.apiService.get<any[]>("/service/detail/"+id);
  }
  
  createService(body: any){
    return this.apiService.post<any, any>("/service/create/", body);
  }

  updateService(id: string, body: any){
    return this.apiService.put<any, any>("/service/update/"+id, body);
  }

}
