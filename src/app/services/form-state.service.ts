import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
   formGroup: FormGroup;

  

    constructor(private fb: FormBuilder) {
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
          ])
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
}
