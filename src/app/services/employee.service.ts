import { Injectable } from '@angular/core';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  constructor() {
    console.log('EmployeeService instance created');
  }

  private employee: Employee[] = [
    {
      id: 1,
      name: 'Sarah Martin',
      email: 'sarah@example.com',
      department: 'Engineering',
      position: 'Software Developer',
      active: true
    },
    {
      id: 2,
      name: 'Adam Wilson',
      email: 'adam@example.com',
      department: 'Marketing',
      position: 'Marketing Specialist',
      active: true
    },
    {
      id: 3,
      name: 'Lina Roberts',
      email: 'lina@example.com',
      department: 'Design',
      position: 'UI Designer',
      active: false
    },
    {
      id: 4,
      name: 'Omar Hassan',
      email: 'omar@example.com',
      department: 'Engineering',
      position: 'Backend Developer',
      active: true
    }
  ];

  getEmployees(): Employee[] {
    return [...this.employee]
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employee.find(e => e.id === id)
  }

  getActiveEmployeeCount(): number {
    return this.employee.filter(e => e.active === true).length
  }
}
