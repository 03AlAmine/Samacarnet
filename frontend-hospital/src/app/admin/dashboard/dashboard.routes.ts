import { Route } from '@angular/router';
import { MainComponent } from './main/main.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { DashboardComponent as StudentDashboard } from 'app/patient/dashboard/dashboard.component';
import { DashboardComponent } from 'app/doctor/dashboard/dashboard.component';
import { Page404Component } from 'app/authentication/page404/page404.component';
export const DASHBOARD_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard2',
    pathMatch: 'full',
  },
  {
    path: 'dashboard2',
    component: Dashboard2Component,
  },
  {
    path: 'doctor-dashboard',
    component: DashboardComponent,
  },
  {
    path: 'patient-dashboard',
    component: StudentDashboard,
  },
  { path: '**', component: Page404Component },
];
