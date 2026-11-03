import { 
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal
 } from '@angular/core';

 import { 
  RouterLink,
  ActivatedRoute
  } from '@angular/router';

  import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

  import { 
    catchError,
    map,
    of,
    switchMap
   } from 'rxjs';

   import { EmployeeService } from '../../services/employee.service';
   import { Employee } from '../../models/Employee';

@Component({
  imports: [RouterLink],
  selector: 'app-employee-details',
  styleUrl: './employee-details.css',
  templateUrl: './employee-details.html',
})
export class EmployeeDetails implements OnInit {
  private route = inject(ActivatedRoute)
  private employeeService = inject(EmployeeService)
  private destroyRef = inject(DestroyRef)

  employee = signal<Employee | null>(null);
  loading = signal(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        switchMap(rawId => {
          this.loading.set(true);
          this.employee.set(null);
          this.errorMessage.set(null);

          const id = Number(rawId)

          if(rawId === null || !Number.isSafeInteger(id) || id<=0){
            this.errorMessage.set('Invalid employee ID');
            return of(null)
          }

          return this.employeeService.getEmployeeById(id)
            .pipe(
              catchError(error => {
                console.error('Employee request failed', error);

                this.errorMessage.set(
                  error.status === 404
                    ? 'Employee Not Found'
                    : 'Unable to load employee'
                );
                return of(null)
              })
            );
        }),

        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(employee => {
        this.employee.set(employee);
        this.loading.set(false)
      })
  }
}
