import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { InscriptionComponent } from './component/inscription/inscription.component';

export const routes: Routes = [
  { path: 'connexion', component: LoginComponent, title: 'Connexion'},
  { path: 'inscription', component: InscriptionComponent, title: 'Inscription'},
];
