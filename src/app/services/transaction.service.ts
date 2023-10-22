import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseUrl = `${environment.BACKEND_URL}/transactional/voucher`;



  constructor(private http: HttpClient) { }
  companyId = localStorage.getItem('companyId');

  getVoucherData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/${this.companyId}`);
  }


  createTransaction(data: any) {
    return this.http.post(`${this.baseUrl}/${this.companyId}`, data);
  }
}
