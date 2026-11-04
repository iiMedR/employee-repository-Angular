import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import {
  Subject,
  startWith,
  switchMap,
  map,
  catchError,
  of,
} from 'rxjs';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee'; 
import { LoadState } from '../../models/load-state';

@Component({
  selector: 'app-employees',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './employees.html',
  styleUrl: './employees.css'
})
export class Employees {

  private employeeService = inject(EmployeeService);

  private refreshSubject = new Subject<void>();

  protected refreshCount = signal(0);

  state$ = this.refreshSubject.pipe(
    startWith(undefined),

    switchMap(() =>
      this.employeeService.getEmployees().pipe(

        map((employees): LoadState<Employee[]> => ({
          status: 'success',
          data: employees
        })),

        catchError((error) => {
          console.error('Failed to load employees:', error);

          return of<LoadState<Employee[]>>({
            status: 'error',
            message: 'Unable to load employees.'
          });
        }),

        startWith({
          status: 'loading'
        } as LoadState<Employee[]>)
      )
    )
  );

  refresh(): void {
    this.refreshSubject.next();
    this.refreshCount.update(count => count + 1);
  }
}
