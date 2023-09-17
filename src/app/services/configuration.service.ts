import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
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
}
