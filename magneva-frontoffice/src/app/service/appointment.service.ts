import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  apiService : ApiService = inject(ApiService);

  constructor() { }

  createAppointment(appointment: any){
    //Render dynamic userId
    const userId = "65d114b9694b16acf977652b";
    appointment.userId = userId;
    return this.apiService.post<any, any>("/appointment/create", appointment);
  }

  getAppointments (){
    return this.apiService.get<any[]>("/appointment/list?userId=65d114b9694b16acf977652b") ;
  }
}
