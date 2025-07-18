// src/app/services/appointment.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AppointmentService {
  private apiUrl = `${environment.apiUrl}/appointments`; // Utilisez l'URL de votre backend

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createAppointment(appointment: any): Observable<any> {
    return this.http.post(this.apiUrl, appointment);
  }

  updateAppointment(id: number, appointment: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getDoctorsByHospital(hospitalId: number): Observable<any> {
    return this.http.get(`/api/hospitals/${hospitalId}/doctors`);
  }

  getAvailableSlots(doctorId: number, date: string): Observable<any> {
    return this.http.get(`/api/doctors/${doctorId}/slots/${date}`);
  }

  confirmAppointment(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/confirm`, {});
  }

  cancelAppointment(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/cancel`, {});
  }
  getAppointment(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // src/app/services/appointment.service.ts
  // src/app/services/appointment.service.ts
  getAppointmentsByDoctor(doctorId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}`, {
      params: {
        doctor_id: doctorId.toString(),
        include: "doctor,patient", // Demande à l'API d'inclure les relations
      },
    });
  }
}
