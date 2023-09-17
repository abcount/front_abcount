import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormStateService } from 'src/app/services/form-state.service';

@Component({
  selector: 'app-tap1',
  templateUrl: './tap1.component.html',
  styleUrls: ['./tap1.component.css']
})
export class Tap1Component  {

  labelNombre = 'Nombre de la empresa';
  placeholderNombre = 'Ingrese el nombre de tu empresa';
  iconinputNombre = "fa-regular fa-building";
  labelDireccion = 'Dirección';
  placeholderDireccion = 'Ingrese la dirección de la empresa';
  iconinputDireccion = "fa-regular fa-map-marker-alt";
  labelRubro = 'Rubro';
  placeholderRubro = 'Ingrese el rubro al que se dedica';
  iconinputRubro = "fa-regular fa-store";
  labelNIT = 'NIT de la empresa';
  placeholderNIT = 'Ingrese el NIT de la empresa';
  iconinputNIT = "fa-regular fa-id-card";
  labelEmail = 'E-mail de contacto';
  placeholderEmail = 'Ingrese un e-mail de contacto';
  iconinputEmail = "fa-regular fa-envelope";
  labelNumeroContacto = 'Número de contacto';
  placeholderNumeroContacto = 'Ingrese un número de contacto';
  iconinputNumeroContacto = "fa-regular fa-phone";

  @Input() control: FormControl;
  imageURL: string | ArrayBuffer | null = null;
  isDragging = false;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(public formService: FormStateService) {}
  get formGroup(): FormGroup {
    return this.formService.formGroup;
  }

  onFileChanged(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.loadPreview(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.loadPreview(file);
    }
  }

  onDragLeave(event: DragEvent) {
    this.isDragging = false;
  }

  
/*
  loadPreview(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (reader.result) {
        this.imageURL = reader.result;
      }
    };
    reader.readAsDataURL(file);
  }
*/
loadPreview(file: File) {
  const reader = new FileReader();
  reader.onload = (e) => {
    if (reader.result) {
      this.imageURL = reader.result;
      this.logoControl.setValue(reader.result);  // Añadir esta línea
    }
  };
  reader.readAsDataURL(file);
}
/*
  removeImage() {
    this.imageURL = null;
    this.fileInput.nativeElement.value = '';
  }
*/

removeImage() {
  this.imageURL = null;
  this.fileInput.nativeElement.value = '';
  
  // Establecer el valor del campo 'logo' del formulario a null o cadena vacía
  this.logoControl.setValue(null);
}

  get nombreControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('enterpriseName') as FormControl;
  }

  
  get direccionControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('direccion') as FormControl;

  }
  
  get rubroControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('rubro') as FormControl;

  }
  
  get nitControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('nit') as FormControl;

  }
  
  get emailControl(): FormControl { 
    return (this.formGroup.get('enterprise') as FormGroup).get('email') as FormControl;

  }
  
  get numeroContactoControl(): FormControl {  
    return (this.formGroup.get('enterprise') as FormGroup).get('numeroContacto') as FormControl;

  }
  
  get logoControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('logo') as FormControl;
  }
  printValue() {
    console.log(JSON.stringify(this.formGroup.value, null, 2));
}





}
