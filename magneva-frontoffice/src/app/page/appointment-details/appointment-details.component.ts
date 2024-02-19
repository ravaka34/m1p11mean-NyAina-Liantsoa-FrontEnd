import { Component } from '@angular/core';
import { BreadcrumbChild } from '../../interface/breadcrumbchild';
import { BreadcrumbComponent } from '../../component/breadcrumb/breadcrumb.component';
import { AppointmentContentComponent } from '../../component/appointment-content/appointment-content.component';


@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [BreadcrumbComponent, AppointmentContentComponent],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.css'
})
export class AppointmentDetailsComponent {
  breadcrumChilds: BreadcrumbChild [] = [
    {
      title: "ACCUEIL",
      link: "/accueil"
    },
    {
      title: "RENDEZ-VOUS",
      link: null
    },
    ]
}
