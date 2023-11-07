import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  //Libro Diario
  diaryBookPDF(data: any): Observable<any> {
    const companyId = localStorage.getItem('companyId');
    console.log(companyId);
    return this.http.post<any>(`${environment.BACKEND_URL}/diary/book/pdf/${companyId}`, data);
  }

  //Libro Mayor
  generalLederPDF(data: any): Observable<any> {
    const companyId = localStorage.getItem('companyId');
    console.log(companyId);
    return this.http.post<any>(`${environment.BACKEND_URL}/mayor/book/pdf/${companyId}`, data);
  }
  //Balance General
  balaceSheetPDF(data: any): Observable<any> {
    const companyId = localStorage.getItem('companyId');
    console.log(companyId);
    return this.http.post<any>(`${environment.BACKEND_URL}/balaceSheet/pdf/${companyId}`, data);
  }
  //Estado De Resultados
  statementIncomePDF(data: any): Observable<any> {
    const companyId = localStorage.getItem('companyId');
    console.log(companyId);
    return this.http.post<any>(`${environment.BACKEND_URL}/statementIncome/pdf/${companyId}`, data);
  }
  //Balance De Sumas y Saldos
  balanceSumsAndBalancesPDF(data: any): Observable<any> {
    const companyId = localStorage.getItem('companyId');
    console.log(companyId);
    return this.http.post<any>(`${environment.BACKEND_URL}/balanceSumsAndBalances/pdf/${companyId}`, data);
  }
}
