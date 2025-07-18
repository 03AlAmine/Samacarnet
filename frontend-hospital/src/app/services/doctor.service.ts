// src/app/services/doctor.service.ts
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Doctor } from "../interfaces/doctor";

@Injectable({
  providedIn: "root",
})
export class DoctorService {
  private apiUrl = "http://localhost:8000/api/doctors"; // URL de votre backend LaravelRL complète pour éviter les confusions

  constructor(private http: HttpClient) {}

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl).pipe(
      map((doctors: Doctor[]) => {
        // Transformation simple si nécessaire
        return doctors.map((doctor) => ({
          ...doctor,
          speciality: doctor.speciality || "Non spécifiée",
        }));
      }),
      catchError(this.handleError)
    );
  }
  // Ajoutez cette nouvelle méthode
  getDoctorsByIds(ids: number[]): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`, {
      params: { ids: ids.join(",") },
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error("Error:", error);
    return throwError(
      () => new Error("Erreur lors de la récupération des médecins")
    );
  }
}
