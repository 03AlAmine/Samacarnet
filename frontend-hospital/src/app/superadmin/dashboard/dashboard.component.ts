import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    BreadcrumbComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  breadscrums = [
    {
      title: 'Tableau de bord',
      items: [],
      active: 'Tableau de bord',
      route: '/superadmin/dashboard'
    }
  ]
  constructor(){
  }

  ngOnInit(): void {
  }

}
