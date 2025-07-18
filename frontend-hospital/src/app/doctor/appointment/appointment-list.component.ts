// src/app/doctor/appointment-list/appointment-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-doctor-appointment-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class DoctorAppointmentListComponent implements OnInit {
  appointments: any[] = [];
  currentDoctorId!: number;

    constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.id) {
      this.currentDoctorId = currentUser.id;
      this.loadDoctorAppointments();
    }
  }

  loadDoctorAppointments(): void {
    this.appointmentService.getAppointmentsByDoctor(this.currentDoctorId).subscribe({
      next: (data) => {
        this.appointments = data;
        console.log('Rendez-vous chargés:', data); // Vérifiez les données ici
      },
      error: (err) => console.error('Erreur:', err)
    });
  }

  confirmAppointment(id: number): void {
    this.appointmentService.confirmAppointment(id).subscribe(
      () => this.loadDoctorAppointments(),
      error => console.error(error)
    );
  }

  cancelAppointment(id: number): void {
    if (confirm('Voulez-vous vraiment annuler ce rendez-vous?')) {
      this.appointmentService.cancelAppointment(id).subscribe(
        () => this.loadDoctorAppointments(),
        error => console.error(error)
      );
    }
  }
}