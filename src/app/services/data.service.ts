import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuxiliaryDto} from "../dto/auxiliary.dto";
import {BehaviorSubject, Observable} from "rxjs";
import {EntityDto} from "../dto/entity.dto";
import {ExchangeRateDto} from "../dto/exchangeRate.dto";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = environment.BACKEND_URL;
  companyId = 1; // sessionStorage.getItem('companyId');


  constructor(private http: HttpClient) {}

  // Auxiliares
  createAuxiliary(auxiliary: AuxiliaryDto){
    return this.http.post(`${this.baseUrl}/auxiliaryAccount/${this.companyId}`, auxiliary);
  }

  getAllAuxiliaries(): Observable<AuxiliaryDto[]> {
    return this.http.get<AuxiliaryDto[]>(`${this.baseUrl}/auxiliaryAccount/${this.companyId}`);
  }
  updateAuxiliary(auxiliary: AuxiliaryDto): Observable<AuxiliaryDto> {
    return this.http.put<AuxiliaryDto>(`${this.baseUrl}/auxiliaryAccount/`, auxiliary);
  }
  deleteAuxiliary(auxiliaryId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}//auxiliaryAccount/${auxiliaryId}`);
  }

  //Entidades
  createEntity(entity: EntityDto): Observable<EntityDto> {
    return this.http.post<EntityDto>(
      `${this.baseUrl}/entity/${this.companyId}`, entity);
  }
  getAllEntities(): Observable<EntityDto[]> {
    return this.http.get<EntityDto[]>(`${this.baseUrl}/entity/${this.companyId}`);
  }

  updateEntity(entity: EntityDto): Observable<EntityDto> {
    return this.http.put<EntityDto>(`${this.baseUrl}/entity/`, entity);
  }

  deleteEntity(entityId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${entityId}`);
  }

  //Cambios de moneda


  private editingRecordSource = new BehaviorSubject<ExchangeRateDto | null>(null);
  currentEditingRecord = this.editingRecordSource.asObservable();



  getExchangeRates(): Observable<{ data: ExchangeRateDto[] }> {
    console.log("Llamando a la URL:", `${this.baseUrl}/getAllExchangeRates`);
    return this.http.get<{ data: ExchangeRateDto[] }>(`${this.baseUrl}/getAllExchangeRates`);
  }


  createExchangeRate(data: ExchangeRateDto): Observable<ExchangeRateDto> {
    return this.http.post<ExchangeRateDto>(`${this.baseUrl}/createExchangeRate`, data);
  }

  updateExchangeRate(data: ExchangeRateDto): Observable<ExchangeRateDto> {
    return this.http.put<ExchangeRateDto>(`${this.baseUrl}/updateExchangeRate/${data.id}`, data);
  }

  deleteExchangeRate(data: ExchangeRateDto): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteExchangeRate/${data.id}`);
  }


  getCurrencies(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/getCurrencies`);
  }
}
