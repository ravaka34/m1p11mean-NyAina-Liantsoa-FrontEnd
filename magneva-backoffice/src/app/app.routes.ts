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
import { CreateExpenseCategoryComponent } from './pages/manager/expense-category/create-expense-category/create-expense-category.component';
import { ListExpenseCategoryComponent } from './pages/manager/expense-category/list-expense-category/list-expense-category.component';
import { ListExpenseComponent } from './pages/manager/expense/list-expense/list-expense.component';
import { CreateExpenseComponent } from './pages/manager/expense/create-expense/create-expense.component';
import { CreatePieceComponent } from './pages/manager/piece/create-piece/create-piece.component';
import { ListPieceComponent } from './pages/manager/piece/list-piece/list-piece.component';
import { ListPurchaseComponent } from './pages/manager/purchase/list-purchase/list-purchase.component';
import { DetailPurchaseComponent } from './pages/manager/purchase/detail-purchase/detail-purchase.component';
import { CreatePurchaseComponent } from './pages/manager/purchase/create-purchase/create-purchase.component';
import { DashboardComponent } from './pages/employee/dashboard/dashboard.component';
import { AppointmentEmpListComponent } from './pages/employee/appointment/appointment-emp-list/appointment-emp-list.component';
import { ListOfferComponent } from './pages/manager/offer/list-offer/list-offer.component';
import { DetailOfferComponent } from './pages/manager/offer/detail-offer/detail-offer.component';
import { CreateOfferComponent } from './pages/manager/offer/create-offer/create-offer.component';
import { HourlyDetailComponent } from './pages/employee/hourly/hourly-detail/hourly-detail.component';
import { CreateHourlyComponent } from './pages/employee/hourly/create-hourly/create-hourly.component';
import { DashboardManagerComponent } from './pages/manager/dashboard-manager/dashboard-manager.component';
import { ListRdvComponent } from './pages/manager/appointment/list-rdv/list-rdv.component';
import { LoginManagerComponent } from './pages/manager/login-manager/login-manager.component';
import { LoginEmployeeComponent } from './pages/employee/login-employee/login-employee.component';
import { LogoutComponent } from './component/logout/logout.component';

export const routes: Routes = [
  { path: 'connexion', component: LoginComponent, title: 'Connexion'},
  { path: 'exemple1', component: Exemple1Component, title: 'Exemple 1'},
  { path: 'exemple2', component: Exemple2Component, title: 'Exemple 2'},

  { path: '', redirectTo: '/manager/connexion', pathMatch: 'full' },

  { path: 'manager/connexion', component: LoginManagerComponent, title: "Connexion manager"},

  { path: 'manager/accueil', component: DashboardManagerComponent, title: "Accueil"},

  { path: 'manager/employe/inscription', component: RegisterComponent, title: "Inscrption d'un employé"},
  { path: 'manager/employe/liste', component: ListComponent, title: "Liste des employés"},
  { path: 'manager/employe/detail/:idEmploye', component: DetailComponent, title: "Détail employé"},
  { path: 'manager/employe/salaire/:idEmploye', component: AddSalaryComponent, title: "Ajout/Modification salaire"},
  { path: 'manager/employe/modifierMdp/:idEmploye', component: UpdateMdpComponent, title: "Modifier Mot De Passe"},
  { path: 'manager/employe/modifierProfil/:idEmploye', component: UpdateProfilEmployeeComponent, title: "Modifier Profil"},

  { path: 'manager/service/ajout', component: CreateService, title: "Nouveau Service"},
  { path: 'manager/service/liste', component: ListService, title: "Liste des services"},
  { path: 'manager/service/modifier/:idService', component: UpdateService, title: "Modifier service"},
  { path: 'manager/service/detail/:idService', component: DetailService, title: "Détail service"},

  { path: 'manager/typeDepense/ajout', component: CreateExpenseCategoryComponent, title: "Nouveau Type de dépense"},
  { path: 'manager/typeDepense/liste', component: ListExpenseCategoryComponent, title: "Liste types de dépense"},

  { path: 'manager/depense/liste', component: ListExpenseComponent, title: "Liste des dépenses"},
  { path: 'manager/depense/ajout', component: CreateExpenseComponent, title: "Nouveau dépense"},

  { path: 'manager/piece/ajout', component: CreatePieceComponent, title: "Nouvelle pièce"},
  { path: 'manager/piece/liste', component: ListPieceComponent, title: "Liste des pièces"},

  { path: 'manager/achat/liste', component: ListPurchaseComponent, title: "Liste des achats"},
  { path: 'manager/achat/detail/:idPurchase', component: DetailPurchaseComponent, title: "Détail achat"},
  { path: 'manager/achat/ajout', component: CreatePurchaseComponent, title: "Nouveau achat"},

  { path: 'manager/offreSpecial/liste', component: ListOfferComponent, title: "Liste des offres spéciales"},
  { path: 'manager/offreSpecial/detail/:idOffer', component: DetailOfferComponent, title: "Détail d'une offre spéciale"},
  { path: 'manager/offreSpecial/ajout', component: CreateOfferComponent, title: "Nouvelle offre spéciale"},

  { path: 'manager/rendezVous/liste', component: ListRdvComponent, title: "Liste rendez-vous"},


  { path: 'employe/connexion', component: LoginEmployeeComponent, title: "Connexion employé"},

  { path: 'employe/accueil', component: DashboardComponent, title: "Accueil"},

  { path: 'employe/detail', component: DetailEmploye, title: "Détail employé"},
  { path: 'employe/modifierMdp/:idEmploye', component: UpdateMdpEmp, title: "Modifier Mot De Passe"},
  { path: 'employe/modifierProfil/:idEmploye', component: UpdateProfilEmployeeComponent, title: "Modifier Profil"},

  { path: 'employe/rendezVous/liste', component: AppointmentEmpListComponent, title: "Liste des rendez-vous"},

  { path: 'employe/horaire/detail', component: HourlyDetailComponent, title: "Détail horaire de travail"},
  { path: 'employe/horaire/ajout', component: CreateHourlyComponent, title: "Nouveau horaire de travail"},

  { path: 'logout', component: LogoutComponent, title: "Se deconnecter"}
];
