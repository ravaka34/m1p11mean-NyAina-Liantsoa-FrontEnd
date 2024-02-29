import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { InscriptionComponent } from './component/inscription/inscription.component';
import { AppointmentDetailsComponent } from './page/appointment-details/appointment-details.component';
import { ServicesComponent } from './page/services/services.component';
import { ServiceDetailsComponent } from './page/service-details/service-details.component';
import { EmployeesComponent } from './page/employees/employees.component';
import { EmployeesDetailsComponent } from './page/employees-details/employees-details.component';
import { CreateAppointmentComponent } from './page/create-appointment/create-appointment.component';
import { AppointmentListComponent } from './page/appointment-list/appointment-list.component';
import { AccueilComponent } from './page/accueil/accueil.component';

export const routes: Routes = [
  { path: 'connexion', component: LoginComponent, title: 'Connexion'},
  { path: 'inscription', component: InscriptionComponent, title: 'Inscription'},
  { path: 'rendez-vous', component: CreateAppointmentComponent, title: 'Rendez-vous' },
  { path: 'rendez-vous/:id', component: AppointmentDetailsComponent, title: 'Rendez-vous'},
  { path: 'services', component: ServicesComponent, title: 'Services' },
  { path: 'service/:id', component: ServiceDetailsComponent, title: 'Service'},
  { path: 'membres', component: EmployeesComponent, title: 'Membres' },
  { path: 'membre/:id', component: EmployeesDetailsComponent, title: 'Membre'},
  { path: 'connecter', component: LoginComponent, title: 'Login'},
  { path: 'mes-rendez-vous', component: AppointmentListComponent, title: 'Mes rendez vous'},
  { path: 'accueil', component: AccueilComponent, title: 'Accueil'},
  { path: '', component: AccueilComponent, title: 'Accueil'},
  { path: 'inscription', component: InscriptionComponent, title: 'Inscription'},
];

