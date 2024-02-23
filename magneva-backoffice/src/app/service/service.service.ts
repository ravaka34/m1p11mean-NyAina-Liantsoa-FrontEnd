import { Injectable } from '@angular/core';
import { environnement } from '../../environnement/environnement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseURL : string = environnement.baseURL;

  constructor(private http: HttpClient) { }

  getAllServices(): Observable<any[]> {
    return this.http.get<any[]>(this.baseURL + "/service/list");
  }
  
}
