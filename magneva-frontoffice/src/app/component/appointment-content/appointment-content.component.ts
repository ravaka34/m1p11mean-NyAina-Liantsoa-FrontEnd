import { Component, NgModule } from '@angular/core';
import { ServiceBookDetails } from '../../interface/servicebookdetails';
import { CommonModule } from '@angular/common';
import { CdkDropList, CdkDragDrop, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-appointment-content',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './appointment-content.component.html',
  styleUrl: './appointment-content.component.css'
})
export class AppointmentContentComponent {
  servicesBookDetails : ServiceBookDetails[] = [
    {
      serviceName: "Massage",
      employeeName: "Harry",
      time: "16:00 - 17:00",
      price: "20,000 Ar"
    },
    {
      serviceName: "Coiffure",
      employeeName: "Fanja",
      time: "17:00 - 18:00",
      price: "20,000 Ar"
    },
  ]

  drop(event: CdkDragDrop<string[]>){
    console.log(event);
    moveItemInArray(this.servicesBookDetails, event.previousIndex, event.currentIndex);
    console.log(this.servicesBookDetails);
  }
}
