import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-choose-employee',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './choose-employee.component.html',
  styleUrl: './choose-employee.component.css'
})
export class ChooseEmployeeComponent {

  @Input() service : any;
  @Input() employees! : any[];
  employeeChoosen : any | null = null;

  chooseEmployee(employee: any) {
    this.employeeChoosen = employee;
    this.service.employee = employee;
  }
}
