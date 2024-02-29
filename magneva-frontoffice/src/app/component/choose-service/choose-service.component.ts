import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonFunctionalityComponentComponent } from '../common-functionality-component/common-functionality-component.component';

@Component({
  selector: 'app-choose-service',
  standalone: true,
  imports: [
   FormsModule,
   CommonModule
  ],
  templateUrl: './choose-service.component.html',
  styleUrl: './choose-service.component.css'
})
export class ChooseServiceComponent extends CommonFunctionalityComponentComponent {
  @Input() service : any ;
  @Input() selectedServices! : any[];
  isChecked = false;


  onClick(){
    this.isChecked = !this.isChecked;
    if(this.isChecked){
      this.selectedServices.push(this.service);
      console.log(this.selectedServices);
      console.log("add to the selected services");
    }else{
      let elementToRemove = this.selectedServices.indexOf(this.service);
      if (elementToRemove !== -1) {
        console.log("remove from the list");
        this.selectedServices.splice(elementToRemove, 1); // Remove the element at the specified index
        console.log(this.selectedServices);
      }
    }
  }
}
