import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../service/appointment.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent {
  appointmentService = inject(AppointmentService);

  appointments! : any[];

  constructor(private route: ActivatedRoute,private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.showLoader();
    this.appointmentService.getAppointments().subscribe(
      (data) => {
        this.appointments = data;
        this.loaderService.hideLoader();
      }
    )
  }
}
