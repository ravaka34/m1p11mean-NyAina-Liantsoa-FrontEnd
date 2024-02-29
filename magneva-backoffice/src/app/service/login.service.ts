import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environnement } from '../../environnement/environnement';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly http = inject(HttpClient);
  private readonly api_url = environnement.baseURL;

  localStorageService : LocalStorageService = inject(LocalStorageService);

  get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    return new HttpHeaders(headersConfig);
  }

  constructor() { }

  login(body: any){
    return this.http.post<any>(this.api_url+"/auth/signin", JSON.stringify(body),{ 
      headers: this.headers 
    });
  }

}
