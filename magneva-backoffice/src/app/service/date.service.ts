import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getEndOfWeek(): string {
    const endOfWeek = new Date(new Date());
    endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
    const year = endOfWeek.getFullYear();
    const month = (endOfWeek.getMonth() + 1).toString().padStart(2, '0');
    const day = endOfWeek.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
}
