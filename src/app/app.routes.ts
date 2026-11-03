import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Employees } from './pages/employees/employees';
import { Settings } from './pages/settings/settings';
import { About } from './pages/about/about';
import { NotFound } from './pages/not-found/not-found';
import { EmployeeDetails } from './pages/employee-details/employee-details';

export const routes: Routes = [
    {
        path: '',
        component: Dashboard
    },
    {
        path: 'employees',
        component: Employees
    },
    {
        path: 'employees/:id',
        component: EmployeeDetails
    },
    {
        path: 'settings',
        component: Settings
    },
    {
        path: 'about',
        component: About
    },
    {
        path: '**',
        component: NotFound
    }
];
