import { Component, OnInit, inject } from '@angular/core';
import { BreadcrumbChild } from '../../interface/breadcrumbchild';
import { BreadcrumbComponent } from '../../component/breadcrumb/breadcrumb.component';
import { AppointmentContentComponent } from '../../component/appointment-content/appointment-content.component';
import { LoaderService } from '../../service/loader.service';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../service/appointment.service';


@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [BreadcrumbComponent, AppointmentContentComponent],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.css'
})
export class AppointmentDetailsComponent implements OnInit{

  data! :any;
  loaderService : LoaderService = inject(LoaderService);
  router: ActivatedRoute = inject(ActivatedRoute);
  appointmentService = inject(AppointmentService);

  ngOnInit() {
    let appointmentId = this.router.snapshot.params['id'];
    this.loaderService.showLoader();
    this.appointmentService.getPageDetailsData(appointmentId).subscribe(
      data => {
        this.data = data;
        console.log(data);
        this.loaderService.hideLoader();
      }
    );
  }

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
