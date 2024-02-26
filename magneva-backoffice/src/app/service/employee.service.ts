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

  removeOrAddService(employeeID: string, body: any, isAddService: boolean){
    if(isAddService){
      return this.apiService.put<any, any>("/manager/employee/addService/"+employeeID, body);
    }else{
      return this.apiService.put<any, any>("/manager/employee/removeService/"+employeeID, body);
    }
  }

  updatePassword(employeeID: string, body: any){
    return this.apiService.put<any, any>("/employee/updatePassword/"+employeeID, body);
  }

  updateProfil(employeeID: string, body: any){
    return this.apiService.put<any, any>("/employee/updateProfil/"+employeeID, body);
  }
}

