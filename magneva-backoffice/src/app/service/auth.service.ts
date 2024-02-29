import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiService : ApiService = inject(ApiService);
  public isConnected = false;
  public user : any = null;
  public isManager$: Subject<number>;

  setIsManager(value: number){
    this.isManager$.next(value);
  }

  constructor() {
    this.isManager$ = new Subject<number>();
  }

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
