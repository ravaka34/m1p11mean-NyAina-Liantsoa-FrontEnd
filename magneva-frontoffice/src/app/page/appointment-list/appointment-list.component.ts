import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from '../../component/breadcrumb/breadcrumb.component';
import { CommonFunctionalityComponentComponent } from '../../component/common-functionality-component/common-functionality-component.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../service/appointment.service';
import { AuthService } from '../../service/auth.service';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent extends CommonFunctionalityComponentComponent {

  appointmentService : AppointmentService = inject(AppointmentService);
  authService : AuthService = inject(AuthService);
  appointmnents! : any;
  loaderService : LoaderService = inject(LoaderService);

  override ngOnInit(): void {
    if(this.authService.isConnected == false){
      this.router.navigate(['/connecter']);
      return;
    }
    else{
      this.loaderService.showLoader();
      this.appointmentService.getUserAppointments().subscribe(
          data => {
            this.appointmnents = data;
            this.loaderService.hideLoader();
          },
          err =>  {
            console.log(err);
            this.loaderService.hideLoader();
          }
      )
    }
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



}
