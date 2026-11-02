import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { Employee } from '../models/Employee';
import { UsersApiResponse } from '../models/employee-api';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);

  private apiUrl = 'https://dummyjson.com/users';

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<UsersApiResponse>(`${this.apiUrl}?limit=10`)
      .pipe(
        map(response => 
          response.users.map(user => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            department: user.company.department,
            position: user.company.title,
            active: true
          }))
        )
      )
  }
}
