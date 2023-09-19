import { Component, ElementRef, ViewChild, Input, Renderer2 } from '@angular/core';
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
  iconInputNombre = "fa-regular fa-building";
  labelDireccion = 'Dirección';
  placeholderDireccion = 'Ingrese la dirección de la empresa';
  iconInputDireccion = "fa-regular fa-map-marker-alt";
  labelRubro = 'Rubro';
  placeholderRubro = 'Ingrese el rubro al que se dedica';
  iconInputRubro = "fa-regular fa-store";
  labelNIT = 'NIT de la empresa';
  placeholderNIT = 'Ingrese el NIT de la empresa';
  iconInputNIT = "fa-regular fa-id-card";
  labelEmail = 'E-mail de contacto';
  placeholderEmail = 'Ingrese un e-mail de contacto';
  iconInputEmail = "fa-regular fa-envelope";
  labelNumeroContacto = 'Número de contacto';
  placeholderNumeroContacto = 'Ingrese un número de contacto';
  iconInputNumeroContacto = "fa-regular fa-phone";

  @Input() control: FormControl;
  imageURL: string | ArrayBuffer | null = null;
  isDragging = false;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(public formService: FormStateService, private renderer: Renderer2) {}

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

  /*---------------------------------------------------------------------------------------------*/
  @ViewChild('errorMessageNombre') errorMessageRef: ElementRef;
  @ViewChild('errorMessageRubro') errorMessageRef1: ElementRef;
  @ViewChild('errorMessageNIT') errorMessageRef2: ElementRef;
  @ViewChild('errorMessageDireccion') errorMessageRef3: ElementRef;
  @ViewChild('errorMessageEmail') errorMessageRef4: ElementRef;
  @ViewChild('errorMessageContacto') errorMessageRef5: ElementRef;
  //Comprobar que los campos estan llenos 
  verificarCampos() {
    if (this.formGroup.value.enterprise.enterpriseName != "") {
      if (this.formGroup.value.enterprise.rubro != ""){
        if (this.formGroup.value.enterprise.nit != ""){
          if (this.formGroup.value.enterprise.direccion != ""){
            if (this.formGroup.value.enterprise.email != ""){
              if (this.formGroup.value.enterprise.numeroContacto != ""){
              window.location.href = "/tap2";
              } else {
                this.errorMessageRef5.nativeElement.classList.add('show');
                setTimeout(() => {
                  this.errorMessageRef5.nativeElement.classList.remove('show');
                }, 2000);
              }
            } else {
              this.errorMessageRef4.nativeElement.classList.add('show');
              setTimeout(() => {
                this.errorMessageRef4.nativeElement.classList.remove('show');
              }, 2000);
            }
          } else {
            this.errorMessageRef3.nativeElement.classList.add('show');
            setTimeout(() => {
              this.errorMessageRef3.nativeElement.classList.remove('show');
            }, 2000);
          }
        } else {
          this.errorMessageRef2.nativeElement.classList.add('show');
          setTimeout(() => {
            this.errorMessageRef2.nativeElement.classList.remove('show');
          }, 2000);
        }
      } else {
        this.errorMessageRef1.nativeElement.classList.add('show');
        setTimeout(() => {
          this.errorMessageRef1.nativeElement.classList.remove('show');
        }, 2000);
      }
    } else {
      this.errorMessageRef.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorMessageRef.nativeElement.classList.remove('show');
      }, 2000);
    }
  }
}