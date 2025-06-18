import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api';
  private userRole: string | null = null;
  private currentUser: any = null;

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials, { responseType: 'text' }).pipe(
      tap(() => {
        localStorage.setItem('credentials', btoa(`${credentials.email}:${credentials.password}`));
        this.fetchAndStoreUserInfo();
      })
    );
  }

  fetchAndStoreUserInfo() {
    this.getMe().subscribe(user => {
      this.currentUser = user;
      this.userRole = user.rol.name;
      localStorage.setItem('userRole', this.userRole!);
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.navigateByRole(this.userRole!);
    });
  }

  getMe(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/users/me`, { headers });
  }

  getAuthHeaders(): HttpHeaders {
    const credentials = localStorage.getItem('credentials');
    if (credentials) {
      return new HttpHeaders({
        'Authorization': `Basic ${credentials}`
      });
    }
    return new HttpHeaders();
  }

  navigateByRole(role: string) {
    switch (role.toUpperCase()) {
      case 'CLIENTE':
        this.router.navigate(['/cliente/dashboard']);
        break;
      case 'OPERADOR':
        this.router.navigate(['/operador/dashboard']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }

  logout() {
    localStorage.removeItem('credentials');
    localStorage.removeItem('userRole');
    localStorage.removeItem('currentUser');
    this.userRole = null;
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  getUserRole(): string | null {
    if (!this.userRole) {
      this.userRole = localStorage.getItem('userRole');
    }
    return this.userRole;
  }

  getCurrentUser(): any {
    if (!this.currentUser) {
        const user = localStorage.getItem('currentUser');
        this.currentUser = user ? JSON.parse(user) : null;
    }
    return this.currentUser;
  }
}
