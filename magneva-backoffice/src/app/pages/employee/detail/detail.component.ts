import { Component } from '@angular/core';
import { DetailEmployeeComponent } from '../../../component/detail-employee/detail-employee.component';

@Component({
  selector: 'app-detail-emp',
  standalone: true,
  imports: [
    DetailEmployeeComponent
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  isManager : boolean = false;
}
