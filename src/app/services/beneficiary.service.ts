import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
  private apiUrl = 'http://localhost:8081/api/beneficiaries';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getBeneficiariesByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`, { headers: this.authService.getAuthHeaders() });
  }

  addBeneficiary(beneficiary: any): Observable<any> {
    return this.http.post(this.apiUrl, beneficiary, { headers: this.authService.getAuthHeaders() });
  }

  deleteBeneficiary(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.authService.getAuthHeaders() });
  }
}
