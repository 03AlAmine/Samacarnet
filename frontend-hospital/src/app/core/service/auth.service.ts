import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'environments/environment.development';
import { AuthResponse } from '../models/auth-response';
import { RegisterPayload } from '@core/models/register-payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          console.log('Login response:', response);
          const user = response.user;
          const token = response.access_token;

          user.token = token;

          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', token);

          this.currentUserSubject.next(user);

          console.log('User logged in:', user);
        }),
        map((response) => response.user),
        catchError((error) => {
          return throwError(() => error?.error?.message || 'Login failed');
        })
      );
  }

  register(payload : RegisterPayload): Observable<User> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, payload).pipe(
      tap((response) => {
        const registeredUser = response.user;
        const token = response.access_token;

        registeredUser.token = token;

        localStorage.setItem('currentUser', JSON.stringify(registeredUser));
        localStorage.setItem('token', token);

        this.currentUserSubject.next(registeredUser);
      }),
      map((response) => response.user) 
    );
  }


  logout(): Observable<any> {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
        tap(() => {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
          this.currentUserSubject.next(null);
        }),
        catchError(() => {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
          this.currentUserSubject.next(null);
          return of({ success: false });
        })
      );
    }
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    return of({ success: false });
  }


  getProfile(): Observable<User> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<User>(`${this.apiUrl}/user`, { headers });
  }

}



