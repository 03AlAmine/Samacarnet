import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-hospital',
  imports: [
    BreadcrumbComponent,
  ],
  templateUrl: './hospital.component.html',
  styleUrl: './hospital.component.scss'
})
export class HospitalComponent implements OnInit{

  breadscrums = [
    {
      title: "Hopital",
      items: [],
      active: "Hopitaux",
      route: "/superadmin/hospital"
    }
  ]
  constructor(){

  }

  ngOnInit(){

  }
}
