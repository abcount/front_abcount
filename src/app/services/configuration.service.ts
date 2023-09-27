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
  configurationUrl = `${environment.BACKEND_URL}/api/v1/enterprise`;
  
  // Función para obtener los datos de la empresa
  getEnterprise() {
    //return this.http.get(`${this.configurationUrl}`);
    const entreprise = {
      companyId: 1,
      companyName: 'Empresa textil',
      diccCategory: 'Textil',
      nit: '123456789',
      address: 'Av. 6 de Agosto',
      logoUuid: '../../../../assets/imagen.svg',
      contactEmail: 'emp.textil@gmail.com',
      contactName: '75896421'
    }
    return entreprise;
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
    //return this.http.post(`${this.configurationUrl}`, body, { headers: header });
  }
}
