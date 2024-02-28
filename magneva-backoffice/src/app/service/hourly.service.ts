import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HourlyService {
  apiService : ApiService = inject(ApiService);

  constructor() { }

  getAllHourly(employeeID: string){
    return this.apiService.get<any[]>("/employee/hourly/list/"+employeeID);
  }
  
  createHourly(body: any){
    return this.apiService.post<any, any>("/employee/hourly/create", body);
  }

  deleteHourly(id: string){
    return this.apiService.delete<any[]>("/employee/hourly/delete/"+id);
  }
}
