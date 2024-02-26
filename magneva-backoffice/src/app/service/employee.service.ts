import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiService : ApiService = inject(ApiService);

  constructor() { }

  getAllEmployees(){
    return this.apiService.get<any[]>("/manager/employee/list");
  }

  getEmployee(id: string){
    return this.apiService.get<any[]>("/employee/detail/"+id);
  }
  
  createEmployee(body: any){
    return this.apiService.post<any, any>("/manager/employee/create/", body);
  }

  addOrUpdateSalary(salary: any){
    return this.apiService.post<any, any>("/manager/employee/addSalary/", salary);
  }
}

