import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeureService {

  constructor() { }

  formatHour(hour: Number): string {
    let numberString: string = hour.toString();
    if (numberString.length < 4 && numberString.length !== 1) {
        numberString = "0" + numberString;
    };
    if( numberString.length === 1 ){
      numberString = "000" + numberString;
    }
    const hourFormatted = numberString.slice(0, 2);
    const minuteFormatted = numberString.slice(2, 4);
    return `${hourFormatted}:${minuteFormatted}`;
  }
}
