import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {NewAccount} from "../components/configuration/configuration-tap4/configuration-tap4.component";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  // Para la configuración inicial de la empresa
  private formGroup: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formGroup = this.fb.group({
      nombre: [''],
      direccion: [''],
      rubro: [''],
      nit: [''],
      email: [''],
      numeroContacto: [''],
      logo: [''],
      subsidiary: [''],
      address: [''],
      area: ['']
    });
  }
  get form(): FormGroup {
    return this.formGroup;
  }

  // Para la configuración de la empresa
  configurationUrl = `${environment.BACKEND_URL}/config/enterprise`;

  // Id de la compañia
  companyId = localStorage.getItem('companyId');

  // Función para obtener los datos de la empresa
  getEnterprise() {
    return this.http.get(`${this.configurationUrl}/${this.companyId}`);
  }

  // Función para guardar los cambios en los datos de la empresa
  updateEnterprise(formData: FormData) {
    return this.http.put(`${this.configurationUrl}/${this.companyId}`, formData);
  }

  // Función para obtener las sucursales y areas
  getSubsidiaries() {
    return this.http.get(`${this.configurationUrl}/${this.companyId}/subsidiary`);
  }

  // Funcion para agregar las nuevas areas y sucursales
  addSubsidiaryArea(subsidiaries: any[], areas: any[]){
    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    const body = {
      'subsidiaries': subsidiaries,
      'areas': areas
    }
    console.log(body);
    return this.http.post(`${this.configurationUrl}/${this.companyId}/subsidiary`, body, { headers: header });
  }

  // Función para obtener las monedas
  getCurrencies() {
    return this.http.get(`${this.configurationUrl}/currency/${this.companyId}`);
  }

  // Función para agregar moneda
  addCurrency(currenciesId: number[]) {
    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    const body = {
      'currencies': currenciesId
    }
    return this.http.post(`${this.configurationUrl}/currency/${this.companyId}`, body, { headers: header });
  }

  // Función para obtener el plan de cuentas
  getAccountsPlan() {
    console.log("getAccountsPlan")
    return this.http.get(`${this.configurationUrl}/accountable-plan/${this.companyId}`);
  }

  updateAccountPlan(newAccountsAdded: NewAccount[], deletedAccounts: number[]){
    console.log("UPDATE Account plan")
    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    const body = {
      'delete': deletedAccounts,
      'new': newAccountsAdded
    }
    console.log(body)
    return this.http.post(`${this.configurationUrl}/accountable-plan/${this.companyId}`,body )
  }
}
