import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tap1',
  templateUrl: './tap1.component.html',
  styleUrls: ['./tap1.component.css']
})
export class Tap1Component {

  placeholderNombre: string = 'Ingrese el nombre de la empresa';
  placeholderRubro: string = 'Ingrese el rubro de la empresa';
  placeholderNIT: string = 'Ingrese el NIT de la empresa';
  placeholderDireccion: string = 'Ingrese la dirección de la empresa';
  placeholderEmail: string = 'Ingrese el email de contacto';
  placeholderNumeroContacto: string = 'Ingrese el número de contacto';

  imageURL: string | ArrayBuffer | null = null;
  isDragging = false;
  @ViewChild('fileInput') fileInput!: ElementRef;

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

  onInputText(text: string) {
    console.log('Text changed: ' + text);
  }

}
