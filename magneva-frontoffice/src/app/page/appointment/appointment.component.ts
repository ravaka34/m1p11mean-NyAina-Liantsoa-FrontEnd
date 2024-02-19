import { Component } from '@angular/core';
import { CreateAppointmentComponent } from '../../component/create-appointment/create-appointment.component'; 
import { BreadcrumbComponent } from '../../component/breadcrumb/breadcrumb.component';
import { BreadcrumbChild } from '../../interface/breadcrumbchild';


@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CreateAppointmentComponent, BreadcrumbComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {

  breadcrumbTitle: String = "RENDEZ-VOUS";

  breadcrumbChilds: BreadcrumbChild[] = [
    {
      title: "ACCUEIL",
      link: "/accueil"
    },
    {
      title: "RENDEZ-VOUS",
      link: null
    }
  ];
}
