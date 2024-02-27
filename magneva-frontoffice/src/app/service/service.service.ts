import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiService : ApiService = inject(ApiService);

  constructor(private localStorageService: LocalStorageService) { }

  getAllServices(){
    return this.apiService.get<any[]>("/service/list");
  }

  getAllServicesWithReviews(){
    return this.apiService.get<any[]>("/review/services");
  }

  getServiceWithReviews(serviceId : string){
    // let user = this.localStorageService.getItem("user");
    // let userIdQuery = (user) ? "?userId="+user.id : "";
    //TODO render dynamic userIdQuery
    let userIdQuery = "?userId=65dc4454cf95340c0db28ee4";
    return this.apiService.get<any[]>("/review/service/"+serviceId+userIdQuery);
  }
}
