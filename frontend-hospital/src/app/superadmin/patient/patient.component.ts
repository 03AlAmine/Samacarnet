import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-patient',
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent implements OnInit{

  breadscrums = [
    {
      title: "Patient",
      items: [],
      active: "Patients",
      route: "/superadmin/patient"
    }
  ]
  constructor(){

  }

  ngOnInit(): void {
    
  }
}
