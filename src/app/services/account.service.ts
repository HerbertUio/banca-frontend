import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8081/api/accounts';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAccountsByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`, { headers: this.authService.getAuthHeaders() });
  }

  createAccount(account: any): Observable<any> {
    return this.http.post(this.apiUrl, account, { headers: this.authService.getAuthHeaders() });
  }

  deleteAccount(accountId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${accountId}`, { headers: this.authService.getAuthHeaders() });
  }

  getTransactions(accountId: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/${accountId}/transactions`, { headers: this.authService.getAuthHeaders() });
  }
}
