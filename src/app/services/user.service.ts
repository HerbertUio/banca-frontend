import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.authService.getAuthHeaders() });
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user, { headers: this.authService.getAuthHeaders() });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.authService.getAuthHeaders() });
  }
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.authService.getAuthHeaders() });
  }
  updateUserProfile(id: number, profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/profile`, profileData, { headers: this.authService.getAuthHeaders() });
  }
}
