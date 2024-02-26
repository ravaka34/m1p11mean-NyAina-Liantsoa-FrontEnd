import { Routes } from '@angular/router';
import { Exemple1Component } from './component/exemple1/exemple1.component';
import { Exemple2Component } from './component/exemple2/exemple2.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './pages/manager/employee/register/register.component';
import { ListComponent } from './pages/manager/employee/list/list.component';
import { DetailComponent } from './pages/manager/employee/detail/detail.component';
import { CreateComponent as CreateService } from './pages/manager/service/create/create.component';
import { ListComponent as ListService } from './pages/manager/service/list/list.component';
import { UpdateComponent as UpdateService} from './pages/manager/service/update/update.component';
import { DetailComponent as DetailService } from './pages/manager/service/detail/detail.component';
import { AddSalaryComponent } from './pages/manager/employee/add-salary/add-salary.component';
import { DetailComponent as DetailEmploye } from './pages/employee/detail/detail.component';
import { UpdateMdpComponent} from './pages/manager/employee/update-mdp/update-mdp.component';
import { UpdateMdpComponent as UpdateMdpEmp} from './pages/employee/update-mdp/update-mdp.component';
import { UpdateProfilEmployeeComponent } from './component/update-profil-employee/update-profil-employee.component';

export const routes: Routes = [
  { path: 'connexion', component: LoginComponent, title: 'Connexion'},
  { path: 'exemple1', component: Exemple1Component, title: 'Exemple 1'},
  { path: 'exemple2', component: Exemple2Component, title: 'Exemple 2'},
  
  { path: 'manager/employe/inscription', component: RegisterComponent, title: "Inscrption d'un employé"},
  { path: 'manager/employe/liste', component: ListComponent, title: "Liste des employés"},
  { path: 'manager/employe/détail/:idEmploye', component: DetailComponent, title: "Détail employé"},
  { path: 'manager/employe/salaire/:idEmploye', component: AddSalaryComponent, title: "Ajout/Modification salaire"},
  { path: 'manager/employe/modifierMdp/:idEmploye', component: UpdateMdpComponent, title: "Modifier Mot De Passe"},
  { path: 'manager/employe/modifierProfil/:idEmploye', component: UpdateProfilEmployeeComponent, title: "Modifier Profil"},

  { path: 'manager/service/ajout', component: CreateService, title: "Nouveau Service"},
  { path: 'manager/service/liste', component: ListService, title: "Liste des services"},
  { path: 'manager/service/modifier/:idService', component: UpdateService, title: "Modifier service"},
  { path: 'manager/service/détail/:idService', component: DetailService, title: "Détail service"},

  { path: 'employe/détail/:idEmploye', component: DetailEmploye, title: "Détail employé"},
  { path: 'employe/modifierMdp/:idEmploye', component: UpdateMdpEmp, title: "Modifier Mot De Passe"},
  { path: 'employe/modifierProfil/:idEmploye', component: UpdateProfilEmployeeComponent, title: "Modifier Profil"},
];
