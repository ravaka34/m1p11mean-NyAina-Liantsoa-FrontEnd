import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loader$: Subject<any>;

  constructor(){
    this.loader$ = new Subject<any>();
  }

  showLoader(){
    this.loader$.next(true);
  }

  hideLoader(){
    this.loader$.next(false);
  }

}
