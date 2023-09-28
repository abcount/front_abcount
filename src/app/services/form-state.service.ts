import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
   
   formGroup: FormGroup;
   private url="http://localhost:8080/api/v1/ms-company/company";

    constructor(public fb: FormBuilder, private http: HttpClient) {

      this.formGroup = this.fb.group({

        enterprise: this.fb.group({
          enterpriseName: [''],
          dicCategory: [''],
          nit: [''],
          enterpriseLocation: [''],
          contactMail: [''],
          contactName: [''],
          subsidiaries: this.fb.array([]),
          
          openingDate: this.obtenerFechaActualEnFormato(),

          }),
          currencyConfig: this.fb.group({
            principalCurrency: 0,
            currencyList: this.fb.array([]),
          }),
          accountablePlan: this.fb.array([]),

      });

    }

  printFormValue() {
    console.log(JSON.stringify(this.formGroup.value, null, 2));
  }
  get form(): FormGroup {
    return this.formGroup;
  }

  getForm(): FormGroup {
    return this.formGroup;
  }

  obtenerFechaActualEnFormato(): string {
    const fechaActual = new Date();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const año = fechaActual.getFullYear().toString();

    return `${mes}-${dia}-${año}`;
  }

  // post de la configuracion de la empresa
  enviarDatos(datos: any): Observable<any> {
    return this.http.post(this.url, datos);
  }

  saveFormDataToLocalStorage() {
    const formData = JSON.stringify(this.formGroup.value);
    localStorage.setItem('formData', formData);
  }

  loadFormDataFromLocalStorage() {
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      const parsedData = JSON.parse(storedFormData);
      this.formGroup.patchValue(parsedData);
    }
  }
    
  clearFormDataFromLocalStorage() {
    localStorage.removeItem('formData');
  }

}
