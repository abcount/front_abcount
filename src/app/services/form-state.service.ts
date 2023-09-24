import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
   formGroup: FormGroup;








    constructor(public fb: FormBuilder) {
      this.formGroup = this.fb.group({
        enterprise: this.fb.group({
          enterpriseName: [''],
          direccion: [''],
          rubro: [''],
          nit: [''],
          email: [''],
          numeroContacto: [''],
          logo: [''],
          subsidiaries: this.fb.array([
            this.createSubsidiary()
          ]),
          openingdate: this.obtenerFechaActualEnFormato(),
          configCurrency: this.fb.group({
            principal: ['Bolivianos'],
            monedas: this.fb.array([]),
          })


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
}
