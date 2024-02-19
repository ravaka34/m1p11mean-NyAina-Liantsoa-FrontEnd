import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { InscriptionComponent } from './component/inscription/inscription.component';
import { AppointmentComponent } from './page/appointment/appointment.component';
import { AppointmentDetailsComponent } from './page/appointment-details/appointment-details.component';

export const routes: Routes = [
  { path: 'connexion', component: LoginComponent, title: 'Connexion'},
  { path: 'inscription', component: InscriptionComponent, title: 'Inscription'},
  { path: 'rendez-vous', component: AppointmentComponent, title: 'Rendez-vous' },
  { path: 'rendez-vous/:id', component: AppointmentDetailsComponent, title: 'Rendez-vous'}
];
