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
  

  getVoucherData(): Observable<any> {
    const companyId = localStorage.getItem('companyId');
    return this.http.get(`${this.baseUrl}/${companyId}`);
  }


  createTransaction(data: any) {
    const companyId = localStorage.getItem('companyId');
    return this.http.post(`${this.baseUrl}/${companyId}`, data);
  }
}
