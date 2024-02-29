import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  apiService : ApiService = inject(ApiService);

  constructor() { }

  statAppointmentInOneDay(body :any){
    return this.apiService.post<any, any>("/statistique/statAppointmentInOneDay", body);
  }

  statAppointment(body: any){
    return this.apiService.post<any, any>("/statistique/statAppointment", body);
  }
  
  chiffreAffaireDay(body: any){
    return this.apiService.post<any, any>("/statistique/chiffreAffaireDay", body);
  }

  chiffreAffaire(body: any){
    return this.apiService.post<any, any>("/statistique/chiffreAffaire", body);
  }
  
  statsInit(body: any){
    return this.apiService.post<any, any>("/statistique/statsInit", body);
  }

  getProfit(body: any){
    return this.apiService.post<any, any>("/statistique/profit", body);
  }

  statEmp(body: any){
    return this.apiService.post<any, any>("/statistique/statEmp", body);
  }
}
