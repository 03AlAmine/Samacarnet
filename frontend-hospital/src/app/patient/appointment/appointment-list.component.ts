// src/app/components/appointment-list/appointment-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule, DatePipe } from '@angular/common'; // Ajoutez DatePipe ici
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-appointment-list',
  standalone: true, // Si vous utilisez des composants standalone
  imports: [
    CommonModule,
    RouterModule,
    DatePipe // Ajoutez ceci au tableau des imports
  ],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe(
      data => this.appointments = data,
      error => console.error(error)
    );
  }

  confirmAppointment(id: number): void {
    this.appointmentService.confirmAppointment(id).subscribe(
      () => this.loadAppointments(),
      error => console.error(error)
    );
  }

  cancelAppointment(id: number): void {
    if (confirm('Voulez-vous vraiment annuler ce rendez-vous?')) {
      this.appointmentService.cancelAppointment(id).subscribe(
        () => this.loadAppointments(),
        error => console.error(error)
      );
    }
  }

  deleteAppointment(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce rendez-vous?')) {
      this.appointmentService.deleteAppointment(id).subscribe(
        () => this.loadAppointments(),
        error => console.error(error)
      );
    }
  }
}