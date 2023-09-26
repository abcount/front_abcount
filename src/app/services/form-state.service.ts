import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
   formGroup: FormGroup;
   private url="http://localhost:8081/api/v1/ms-company/company";








    constructor(public fb: FormBuilder, private http: HttpClient) {
      this.formGroup = this.fb.group({
        enterprise: this.fb.group({
          enterpriseName: [''],
          enterpriseLocation: [''],
          dicCategory: [''],
          nit: [''],
          contactMail: [''],
          contactNumber: [''],
          logo64b: [''],
          subsidiaries: this.fb.array([
            this.createSubsidiary()
          ]),
          openingdate: this.obtenerFechaActualEnFormato(),
          currencyConfig: this.fb.group({
            principal: ['Bolivianos'],
            currencyList: this.fb.array([]),
          }),
          configAccount: this.fb.array([]),
        })
      });
    }

    createSubsidiary(): FormGroup {
      return this.fb.group({
        name: [''],
        address: [''],
        areas: this.fb.array([''])
      });
    }

    getSubsidiaries(): FormArray {
      return this.formGroup.get('enterprise.subsidiaries') as FormArray;
    }

    addSubsidiary() {
      this.getSubsidiaries().push(this.createSubsidiary());
    }

    removeSubsidiary(index: number) {
      this.getSubsidiaries().removeAt(index);
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

    return `${mes}/${dia}/${año}`;
  }


  // post de la configuracion de la empresa
  enviarDatos(datos: any): Observable<any> {
    return this.http.post(this.url, datos);
  }



}
