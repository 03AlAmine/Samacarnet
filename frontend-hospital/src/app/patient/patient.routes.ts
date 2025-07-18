import { Page404Component } from '../authentication/page404/page404.component';
import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentListComponent } from './appointment/appointment-list.component';
import { DoctorComponent } from './doctor/doctor.component';
import { MedicalFileComponent } from './medical-file/medical-file.component';
import { ProfileComponent } from './profile/profile.component';


export const PATIENT_ROUTE: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: "appointment",
    component: AppointmentComponent,
  },{
      path: "myappointment",
    component: AppointmentListComponent,
  },
  {
    path: "doctor",
    component: DoctorComponent,
  },
  {
    path: "medical-file",
    component: MedicalFileComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
  },
  { path: '**', component: Page404Component },
];
