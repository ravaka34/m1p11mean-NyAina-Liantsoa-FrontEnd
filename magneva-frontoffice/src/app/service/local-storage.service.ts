import { Injectable, StateKey } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private transferState : TransferState) { }

   // Method to set an item in local storage
  setItem(key: StateKey<any>, value: any): void {
    this.transferState.set(key, value);
  }

  // Method to get an item from local storage
  getItem(key: StateKey<any>): any {
    console.log(this.transferState);
    return this.transferState.get(key, null);
  }

  // Method to remove an item from local storage
  removeItem(key: StateKey<any>): void {
    this.transferState.remove(key);
  }
}
