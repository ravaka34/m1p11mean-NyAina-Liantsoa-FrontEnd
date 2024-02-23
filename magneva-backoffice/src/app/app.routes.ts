import { Routes } from '@angular/router';
import { Exemple1Component } from './component/exemple1/exemple1.component';
import { Exemple2Component } from './component/exemple2/exemple2.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/manager/employee/register/register.component';
import { ListComponent } from './component/manager/employee/list/list.component';
import { DetailComponent } from './component/manager/employee/detail/detail.component';

export const routes: Routes = [
  { path: 'connexion', component: LoginComponent, title: 'Connexion'},
  { path: 'exemple1', component: Exemple1Component, title: 'Exemple 1'},
  { path: 'exemple2', component: Exemple2Component, title: 'Exemple 2'},
  
  { path: 'manager/employe/inscription', component: RegisterComponent, title: "Inscrption d'un employé"},
  { path: 'manager/employe/liste', component: ListComponent, title: "Liste des employés"},
  { path: 'manager/employe/detail/:idEmploye', component: DetailComponent, title: "Détail employé"},
];
