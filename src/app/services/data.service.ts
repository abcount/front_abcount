import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuxiliaryDto} from "../dto/auxiliary.dto";
import {BehaviorSubject, Observable} from "rxjs";
import {EntityDto} from "../dto/entity.dto";
import {ExchangeMoneyDto, ExchangeRateCreate, ExchangeRateDto} from "../dto/exchangeRate.dto";
import { GeneralDto } from '../dto/general.dto';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../components/general-components/message.dialog/message.dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = environment.BACKEND_URL;
  companyId = localStorage.getItem('companyId') || 1;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    if(this.companyId === null){
      const message = this.dialog.open(MessageDialogComponent,{
        width: '300px',
        disableClose: true,
        data: {
          title: "Ocurrio un error!",
          message: "No se pudo obtener la compañia intente de nuevo",
        }
      });
      message.afterClosed().subscribe(() => {
        window.location.reload();
      });
    }
  }
  

  // Auxiliares
  createAuxiliary(auxiliary: AuxiliaryDto): Observable<GeneralDto<AuxiliaryDto[]>> {
    return this.http.post<GeneralDto<AuxiliaryDto[]>>(`${this.baseUrl}/auxiliaryAccount/${this.companyId}`, auxiliary);
  }

  getAllAuxiliaries(): Observable<GeneralDto<AuxiliaryDto[]>>  {
    return this.http.get<GeneralDto<AuxiliaryDto[]>>(`${this.baseUrl}/auxiliaryAccount/${this.companyId}`);
  }
  updateAuxiliary(auxiliary: AuxiliaryDto): Observable<GeneralDto<AuxiliaryDto[]>>{
    return this.http.put<GeneralDto<AuxiliaryDto[]>>(`${this.baseUrl}/auxiliaryAccount/${this.companyId}`, auxiliary);
  }
  deleteAuxiliary(auxiliaryId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/auxiliaryAccount/${auxiliaryId}`);
  }

  //Entidades
  createEntity(entity: EntityDto): Observable<GeneralDto<EntityDto[]>> {
    return this.http.post<GeneralDto<EntityDto[]>>(
      `${this.baseUrl}/entity/${this.companyId}`, entity);
  }
  getAllEntities(): Observable<GeneralDto<EntityDto[]>> {
    return this.http.get<GeneralDto<EntityDto[]>>(`${this.baseUrl}/entity/${this.companyId}`);
  }

  updateEntity(entity: EntityDto): Observable<GeneralDto<EntityDto[]>> {
    return this.http.put<GeneralDto<EntityDto[]>>(`${this.baseUrl}/entity/${this.companyId}`, entity);
  }

  deleteEntity(entityId: number): Observable<GeneralDto<EntityDto[]>>{
    return this.http.delete<GeneralDto<EntityDto[]>>(`${this.baseUrl}/entity/${entityId}`);
  }

  //Cambios de moneda


  private editingRecordSource = new BehaviorSubject<ExchangeRateDto | null>(null);
  currentEditingRecord = this.editingRecordSource.asObservable();



  getExchangeRates(): Observable<{ data: ExchangeRateDto[] }> {
    console.log("Llamando a la URL:", `${this.baseUrl}/getAllExchangeRates`);
    return this.http.get<{ data: ExchangeRateDto[] }>(`${this.baseUrl}/getAllExchangeRates`);
  }


  createExchangeRate(data: ExchangeRateCreate[]): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/exchangeRate/${this.companyId}`, data);
  }

  updateExchangeRate(data: ExchangeRateDto): Observable<ExchangeRateDto> {
    return this.http.put<ExchangeRateDto>(`${this.baseUrl}/updateExchangeRate/${data.id}`, data);
  }

  deleteExchangeRate(data: ExchangeRateDto): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteExchangeRate/${data.id}`);
  }

  getExchangeMoney(): Observable<GeneralDto<ExchangeMoneyDto[]>> {
    return this.http.get<GeneralDto<ExchangeMoneyDto[]>>(`${this.baseUrl}/exchangeMoney/${this.companyId}`);
  }

  getExistExchangeRate(): Observable<GeneralDto<Boolean>> {
    return this.http.get<GeneralDto<Boolean>>(`${this.baseUrl}/exchangeRate/exist/${this.companyId}`);
  }


  
}
