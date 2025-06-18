import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8081/api/transactions';

  constructor(private http: HttpClient, private authService: AuthService) { }

  deposit(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/deposit`, data, { headers: this.authService.getAuthHeaders() });
  }

  withdrawal(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/withdrawal`, data, { headers: this.authService.getAuthHeaders() });
  }

  transfer(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transfer`, data, { headers: this.authService.getAuthHeaders() });
  }
}
