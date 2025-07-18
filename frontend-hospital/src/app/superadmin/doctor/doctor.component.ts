import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-doctor',
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss'
})
export class DoctorComponent implements OnInit {

  breadscrums = [
    {
      title: "Docteur",
      items: [],
      active: "Docteurs",
      route: "/superadmin/doctor"
    }
  ];

  constructor(){

  }

  ngOnInit(): void {
    
  }
}
