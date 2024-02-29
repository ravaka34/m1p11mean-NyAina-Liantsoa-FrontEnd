import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiService : ApiService = inject(ApiService);
  public isConnected = false;
  public user : any = null;

  constructor() { }

  //{
//     "email": "ravaka34@gmail.com",
//     "password": "ravaka34",
//     "role": "user"
// }
  login(data : any){
    data.role = "user";
    console.log(data);
    return this.apiService.post("/auth/signin", data);
  }

  setUser(data : any){
    this.user = data;
  }

  getUser(){
    return this.user;
  }
}
