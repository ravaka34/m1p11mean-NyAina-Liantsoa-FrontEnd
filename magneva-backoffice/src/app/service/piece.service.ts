import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PieceService {
  apiService : ApiService = inject(ApiService);

  constructor() { }

  getAllPieces(){
    return this.apiService.get<any[]>("/piece/list");
  }
  
  createPiece(body: any){
    return this.apiService.post<any, any>("/piece/create", body);
  }
}
