import { Route } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HospitalComponent } from "./hospital/hospital.component";
import { AdminComponent } from "./admin/admin.component";
import { DoctorComponent } from "./doctor/doctor.component";
import { PatientComponent } from "./patient/patient.component";
import { ProfileComponent } from "./profile/profile.component";

export const SUPERADMIN_ROUTE: Route[] = [

    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'hospital',
        component: HospitalComponent,
    },
    {
        path: 'admin',
        component: AdminComponent,
    },
    {
        path: 'doctor',
        component: DoctorComponent,
    },
    {
        path: 'patient',
        component: PatientComponent,
    },
    {
        path: "profile",
        component: ProfileComponent,
    }
]