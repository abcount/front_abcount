import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

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

  // Función para obtener los datos de la empresa
  getEnterprise() {
    return this.http.get(`${this.configurationUrl}`);
  }

  // Función para guardar los cambios en los datos de la empresa
  updateEnterprise(companyName: string, diccCategory: string, nit: string, address: string, logoUuid: string, contactEmail: string, contactName: string) {
    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      //'Authorization': 'Bearer $token',
    };
    const body = {
      'companyName': companyName,
      'diccCategory': diccCategory,
      'nit': nit,
      'address': address,
      'logoUuid': logoUuid,
      'contactEmail': contactEmail,
      'contactName': contactName
    }
    return this.http.put(`${this.configurationUrl}`, body, { headers: header });
  }

  // Función para obtener las sucursales y areas
  getSubsidiaries() {
    return this.http.get(`${this.configurationUrl}/subsidiary`);
  }

  // Funcion para agregar las nuevas areas y sucursales
  addSubsidiaryArea(subsidiaries: any[], areas: string[]){
    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      //'Authorization': 'Bearer $token',
    }
    const body = {
      'subsidiaries': subsidiaries,
      'areas': areas
    }
    console.log(body);
    return this.http.post(`${this.configurationUrl}/subsidiary`, body, { headers: header });
  }

  // Función para eliminar las sucursales y areas
  deleteSubsidiaryArea(subsidiaries: any[], areas: string[]){
    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      //'Authorization': 'Bearer $token',
    }
    const body = {
      'subsidiaries': subsidiaries,
      'areas': areas
    }
    console.log(body);
    return this.http.put(`${this.configurationUrl}/subsidiary`, body, { headers: header });
  }

  // Función para obtener las monedas
  getCurrencies() {
    return this.http.get(`${this.configurationUrl}/currency`);
  }

  // Función para agregar moneda
  addCurrency(moneyName: string, abbreviationName: string) {
    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      //'Authorization': 'Bearer $token',
    }
    const body = {
      'moneyName': moneyName,
      'abbreviationName': abbreviationName
    }
    return this.http.post(`${this.configurationUrl}/currency`, body, { headers: header });
  }

  // Función para obtener el plan de cuentas
  getAccountsPlan() {
    console.log("getAccountsPlan")
    return this.http.get(`${this.configurationUrl}/accountable-plan`);
  }
}
