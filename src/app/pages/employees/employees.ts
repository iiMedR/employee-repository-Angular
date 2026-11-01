import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';

@Component({
  imports: [],
  selector: 'app-employees',
  styleUrl: './employees.css',
  templateUrl: './employees.html',
})
export class Employees {
  private employeeService = inject(EmployeeService)

  employees: Employee[] = this.employeeService.getEmployees();
}
