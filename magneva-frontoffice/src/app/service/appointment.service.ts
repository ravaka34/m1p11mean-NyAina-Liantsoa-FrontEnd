import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { catchError } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  apiService : ApiService = inject(ApiService);
  authService : AuthService = inject(AuthService);

  constructor() { }

  createAppointment(appointment: any){
    appointment.userId = this.authService.user.id;
    return this.apiService.post<any, any>("/appointment/create", appointment);
  }

  getPageDetailsData(id: string){
    return this.apiService.get<any>("/appointment/"+id);
  }

  getCreateDatas(){
    return this.apiService.get<any>("/appointment/create/datas");
  }

  getUserAppointments(){
    return this.apiService.get<any>("/appointment/user/"+this.authService.user.id);
  }

  cancelAppointment(id:string){
    return this.apiService.delete("/appointment/"+id);
  }
}
