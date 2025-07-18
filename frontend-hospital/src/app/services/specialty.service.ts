// src/app/services/specialty.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  private apiUrl = '/api/specialties';

  constructor(private http: HttpClient) { }

  getAllSpecialties(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSpecialty(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createSpecialty(specialty: any): Observable<any> {
    return this.http.post(this.apiUrl, specialty);
  }

  updateSpecialty(id: number, specialty: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, specialty);
  }

  deleteSpecialty(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}