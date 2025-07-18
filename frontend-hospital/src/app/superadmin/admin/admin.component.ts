import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-admin',
  imports: [
    BreadcrumbComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{

  breadscrums = [
    {
      title: "Administrateur",
      items: [],
      active: "Administrateurs",
      route: "/superadmin/admin"
    }
  ]
  constructor(){

  }

  ngOnInit(): void {
    
  }
}
