// src/app/services/patient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  getPatientsByIds(patientIds: any[]): any {
    throw new Error("Method not implemented.");
  }
  private apiUrl = '/api/patients';

  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPatient(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createPatient(patient: any): Observable<any> {
    return this.http.post(this.apiUrl, patient);
  }

  updatePatient(id: number, patient: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, patient);
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchPatients(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?term=${term}`);
  }
}