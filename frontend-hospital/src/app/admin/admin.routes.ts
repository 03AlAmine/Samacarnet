import { Route } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { PatientComponent } from './patient/patient.component';
import { ProfileComponent } from './profile/profile.component';

export const ADMIN_ROUTE: Route[] = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTE),
  },
  {
    path: 'hospital',
    loadChildren: () => 
      import('./hospital/hospital.routes').then((m) => m.HOSPITAL_ROUTE),
  },
  {
    path: "appointment",
    component: PatientComponent
  },
  {
    path: "patient",
    component: PatientComponent
  },  
  {
    path: "profile",
    component: ProfileComponent,
  },
  { 
    path: '**',
    component: Page404Component 
  },
];
