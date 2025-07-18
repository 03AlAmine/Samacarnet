// src/app/services/hospital.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private apiUrl = '/api/hospitals';

  constructor(private http: HttpClient) { }

  getAllHospitals(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getHospital(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createHospital(hospital: any): Observable<any> {
    return this.http.post(this.apiUrl, hospital);
  }

  updateHospital(id: number, hospital: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, hospital);
  }

  deleteHospital(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}