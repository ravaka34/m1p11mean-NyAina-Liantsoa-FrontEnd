import { Component } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-common-functionality-component',
  standalone: true,
  imports: [],
  templateUrl: './common-functionality-component.component.html',
  styleUrl: './common-functionality-component.component.css'
})
export class CommonFunctionalityComponentComponent {
  
  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  reloadComponent(self:boolean,urlToNavigateTo ?:string){
     //skipLocationChange:true means dont update the url to / when navigating
    console.log("Current route I am on:",this.router.url);
    const url=self ? this.router.url :urlToNavigateTo;
    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this.router.navigate([`/${url}`]).then(()=>{
        console.log(`After navigation I am on:${this.router.url}`)
      })
    })
  }

  convertToReadableHour(hour: Number){
    return  moment(hour.toString().padStart(4,'0'),  "HH:mm").format("HH:mm");
  }
}
