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
}
