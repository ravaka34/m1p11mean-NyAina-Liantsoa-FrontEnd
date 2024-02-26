import { Component } from '@angular/core';
import { UpdateMdpEmployeeComponent } from '../../../../component/update-mdp-employee/update-mdp-employee.component';

@Component({
  selector: 'app-update-mdp-emp-manager',
  standalone: true,
  imports: [
    UpdateMdpEmployeeComponent
  ],
  templateUrl: './update-mdp.component.html',
  styleUrl: './update-mdp.component.css'
})
export class UpdateMdpComponent {
  isManager : boolean = true;
}
