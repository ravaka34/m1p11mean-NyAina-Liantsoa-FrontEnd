import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  apiService : ApiService = inject(ApiService);

  constructor() { }

  getAllAppointment(body: any){
    return this.apiService.get<any[]>("/appointment/list", body);
  }

  payment(body: any){
    return this.apiService.post<any, any>("/appointment/payment/create", body);
  }

}
