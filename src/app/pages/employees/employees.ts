import { 
  Component,
  inject,
  DestroyRef,
  OnInit,
  signal
 } from '@angular/core';

 import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';

@Component({
  imports: [],
  selector: 'app-employees',
  styleUrl: './employees.css',
  templateUrl: './employees.html',
})
export class Employees implements OnInit {
  private employeeService = inject(EmployeeService);
  private destroyRef = inject(DestroyRef);

  employees = signal<Employee[]>([]);
  loading = signal(false);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading.set(true);
    this.errorMessage.set(null)

    this.employeeService.getEmployees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.employees.set(data);
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error Loading employees:', error);
          this.errorMessage.set('Unable to load employees.');
          this.loading.set(false)
        }
      })
  }
}
