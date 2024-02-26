import { Routes } from '@angular/router';
import { Exemple1Component } from './component/exemple1/exemple1.component';
import { Exemple2Component } from './component/exemple2/exemple2.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/manager/employee/register/register.component';
import { ListComponent } from './component/manager/employee/list/list.component';
import { DetailComponent } from './component/manager/employee/detail/detail.component';
import { CreateComponent as CreateService } from './component/manager/service/create/create.component';
import { ListComponent as ListService } from './component/manager/service/list/list.component';
import { UpdateComponent as UpdateService} from './component/manager/service/update/update.component';
import { DetailComponent as DetailService } from './component/manager/service/detail/detail.component';
import { AddSalaryComponent } from './component/manager/employee/add-salary/add-salary.component';

export const routes: Routes = [
  { path: 'connexion', component: LoginComponent, title: 'Connexion'},
  { path: 'exemple1', component: Exemple1Component, title: 'Exemple 1'},
  { path: 'exemple2', component: Exemple2Component, title: 'Exemple 2'},
  
  { path: 'manager/employe/inscription', component: RegisterComponent, title: "Inscrption d'un employé"},
  { path: 'manager/employe/liste', component: ListComponent, title: "Liste des employés"},
  { path: 'manager/employe/détail/:idEmploye', component: DetailComponent, title: "Détail employé"},
  { path: 'manager/employe/salaire/:idEmploye', component: AddSalaryComponent, title: "Ajout/Modification salaire"},

  { path: 'manager/service/ajout', component: CreateService, title: "Nouveau Service"},
  { path: 'manager/service/liste', component: ListService, title: "Liste des services"},
  { path: 'manager/service/modifier/:idService', component: UpdateService, title: "Modifier service"},
  { path: 'manager/service/détail/:idService', component: DetailService, title: "Détail service"},
];
