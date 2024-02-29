import { Component, OnInit, inject } from '@angular/core';
import { BreadcrumbChild } from '../../interface/breadcrumbchild';
import { BreadcrumbComponent } from '../../component/breadcrumb/breadcrumb.component';
import { AppointmentContentComponent } from '../../component/appointment-content/appointment-content.component';
import { LoaderService } from '../../service/loader.service';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../service/appointment.service';
import { CommonFunctionalityComponentComponent } from '../../component/common-functionality-component/common-functionality-component.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [BreadcrumbComponent, AppointmentContentComponent, CommonModule],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.css'
})
export class AppointmentDetailsComponent extends CommonFunctionalityComponentComponent implements OnInit{
  title = "Mon rendez-vous";
  data! :any;
  loaderService : LoaderService = inject(LoaderService);
  activatedRouter: ActivatedRoute = inject(ActivatedRoute);
  appointmentService = inject(AppointmentService);
  isAlreadyPassed = false;


  override ngOnInit() {
    let appointmentId = this.activatedRouter.snapshot.params['id'];
    this.loaderService.showLoader();
    this.appointmentService.getPageDetailsData(appointmentId).subscribe(
      data => {
        this.data = data.appointment;
        this.isAlreadyPassed = data.isAlreadyPassed;
        console.log(data);
        this.loaderService.hideLoader();
      }
    );
  }

  cancel(){
    // this.appointmentService.cancelAppointment().subscribe(
    //   data => {
    //     this.data =
    //   }
    // );
  }

  convertDate(stringDate : string){
    const date = new Date(stringDate);

    const options : any = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString('fr-FR', options);
  }

  getRealPrice(price: number, reduction: number ){
    return price * (1 + reduction/100 );
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
