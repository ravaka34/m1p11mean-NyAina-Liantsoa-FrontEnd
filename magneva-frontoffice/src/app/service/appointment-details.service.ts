import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentDetailsService {

  apiService : ApiService = inject(ApiService);

  constructor() { }
}
