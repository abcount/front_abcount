import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormStateService } from 'src/app/services/form-state.service';

@Component({
  selector: 'app-tap1',
  templateUrl: './tap1.component.html',
  styleUrls: ['./tap1.component.css']
})
export class Tap1Component  {

  
  placeholderNombre = 'Ingrese el nombre de tu sucursal';
  placeholderDireccion = 'Ingrese la dirección de tu sucursal';
  placeholderRubro = 'Ingrese el rubro de tu sucursal';
  placeholderNIT = 'Ingrese el NIT de tu sucursal';
  placeholderEmail = 'Ingrese el email de tu sucursal';
  placeholderNumeroContacto = 'Ingrese el número de contacto de tu sucursal';

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

  loadPreview(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (reader.result) {
        this.imageURL = reader.result;
      }
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.imageURL = null;
    this.fileInput.nativeElement.value = '';
  }

  get nombreControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('nombre') as FormControl;
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
    return this.formGroup.get('logo') as FormControl;
  }
  printValue() {
    console.log(JSON.stringify(this.formGroup.value, null, 2));
}





}
