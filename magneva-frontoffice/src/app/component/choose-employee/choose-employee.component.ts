import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommonFunctionalityComponentComponent } from '../common-functionality-component/common-functionality-component.component';

@Component({
  selector: 'app-choose-employee',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './choose-employee.component.html',
  styleUrl: './choose-employee.component.css'
})
export class ChooseEmployeeComponent extends CommonFunctionalityComponentComponent {

  @Input() service : any;
  @Input() employees! : any[];
  employeeChoosen : any | null = null;

  chooseEmployee(employee: any) {
    this.employeeChoosen = employee;
    this.service.employee = employee;
  }
}
