import { Page404Component } from '../authentication/page404/page404.component';
import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HospitalComponent } from './hospital/hospital.component';
import { DoctorAppointmentListComponent } from './appointment/appointment-list.component';
import { PatientComponent } from './patient/patient.component';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ConsultationComponent } from './consultation/consultation.component';

export const DOCTOR_ROUTE: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: "hospital",
    component: HospitalComponent,
  },
  {
    path: "appointment",
    component: DoctorAppointmentListComponent,
  },
  {
    path: "patient",
    component: PatientComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
  },
  {
    path: "schedule",
    component: ScheduleComponent,
  },
  {
    path: "consultation",
    component: ConsultationComponent,
  },
  { path: '**', component: Page404Component },
];
