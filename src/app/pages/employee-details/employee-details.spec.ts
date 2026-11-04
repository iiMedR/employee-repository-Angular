import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EmployeeDetails } from './employee-details';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';

describe('EmployeeDetails request lifecycle', () => {
  it('cancels stale requests and keeps a single route subscription after refresh', () => {
    const params = new BehaviorSubject(convertToParamMap({ id: '3' }));
    const requests: { id: number; result: Subject<Employee>; cancelled: boolean }[] = [];

    TestBed.configureTestingModule({
      imports: [EmployeeDetails],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { paramMap: params } },
        { provide: EmployeeService, useValue: {
          getEmployeeById(id: number) {
            const request = { id, result: new Subject<Employee>(), cancelled: false };
            requests.push(request);
            return new Observable<Employee>(subscriber => {
              const subscription = request.result.subscribe(subscriber);
              return () => { request.cancelled = true; subscription.unsubscribe(); };
            });
          }
        } }
      ]
    });
    const fixture = TestBed.createComponent(EmployeeDetails);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    component.refresh();
    component.refresh();
    expect(requests.map(request => request.id)).toEqual([3, 3, 3]);
    expect(requests[0].cancelled).toBe(true);
    expect(requests[1].cancelled).toBe(true);

    params.next(convertToParamMap({ id: '8' }));
    expect(requests.map(request => request.id)).toEqual([3, 3, 3, 8]);
    expect(requests[2].cancelled).toBe(true);

    const employee: Employee = {
      id: 8, name: 'Latest Employee', email: 'latest@example.com',
      department: 'Engineering', position: 'Developer', active: true
    };
    requests[3].result.next(employee);
    requests[2].result.next({ ...employee, id: 3 });
    expect(component.employee()?.id).toBe(8);
    expect(component.loading()).toBe(false);

    fixture.destroy();
    expect(requests[3].cancelled).toBe(true);
  });
});
