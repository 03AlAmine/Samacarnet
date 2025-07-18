import { Route } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { DoctorComponent } from "./doctor/doctor.component";
import { Page404Component } from "app/authentication/page404/page404.component";
import { AdminComponent } from "./admin/admin.component";


export const HOSPITAL_ROUTE: Route[] = [

    {
        path: "main",
        component: MainComponent,
    },
    {
        path: "doctor",
        component: DoctorComponent,
    },
    {
        path: "admin",
        component: AdminComponent,
    },
    {
        path: "**",
        component: Page404Component,
    }
]