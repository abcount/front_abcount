import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormStateService } from 'src/app/services/form-state.service';
import { Router } from '@angular/router';

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

  patternAll = '.*';
  patternAllMessage = 'Ingrese un valor válido';
  patternNumber = '^[0-9]*$';
  patternNumberMessage = 'Por favor, ingrese un número de contacto válido.';
  patternEmail = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  patternEmailMessage = 'Por favor, ingrese una dirección de correo electrónico válida.';

  @Input() control: FormControl;
  imageURL: string | ArrayBuffer | null = null;
  isDragging = false;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(public formService: FormStateService, private router: Router) {}

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
    return (this.formGroup.get('enterprise') as FormGroup).get('enterpriseLocation') as FormControl;

  }

  get rubroControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('dicCategory') as FormControl;

  }

  get nitControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('nit') as FormControl;

  }

  get emailControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('contactMail') as FormControl;

  }

  get numeroContactoControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('contactName') as FormControl;
  }
  get logoControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('logo64b') as FormControl;
  }

  printValue() {
    console.log(JSON.stringify(this.formGroup.value, null, 2));
  }

  /*---------------------------------------------------------------------------------------------*/
  @ViewChild('errorMessage') errorMessage: ElementRef;
  @ViewChild('errorMessageLogo') errorMessageLogo: ElementRef;
  //Comprobar que los campos estan llenos
  verificarCampos() {
    if (this.nombreControl.valid && this.direccionControl.valid && this.rubroControl.valid && this.nitControl.valid && this.emailControl.valid && this.numeroContactoControl.valid) {
      if (this.formGroup.value.enterprise.enterpriseName != "" && this.formGroup.value.enterprise.direccion != "" && this.formGroup.value.enterprise.rubro != "" && this.formGroup.value.enterprise.nit != "" && this.formGroup.value.enterprise.email != "" && this.formGroup.value.enterprise.numeroContacto != "") {
        if (true) {
          this.router.navigate(['/tap2']);
        } else {
 
        }
      } else {
        console.log('Vacios');
        this.errorMessage.nativeElement.classList.add('show');
        setTimeout(() => {
          this.errorMessage.nativeElement.classList.remove('show');
        }, 3000);
      }
    } else {
      console.log('Falla');
      this.errorMessage.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorMessage.nativeElement.classList.remove('show');
      }, 3000);
    }
  }
}
