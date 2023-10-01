import { Component } from '@angular/core';

@Component({
  selector: 'app-accounting-voucher-view',
  templateUrl: './accounting-voucher-view.component.html',
  styleUrls: ['./accounting-voucher-view.component.css']
})
export class AccountingVoucherViewComponent {
  hojas: any[] = [this.nuevaHoja()];
  hojaActual: number = 0;


  nuevaHoja() {
    return {
      entradas: Array(10).fill({}).map(() => ({
        numeroCuenta: '',
        nombreCuenta: '',
        auxiliar: '',
        entidad: '',
        debe: 0,
        haber: 0,
        glosa: '',
        cheque: ''
      }))
    };
  }

  get hoja() {
    return this.hojas[this.hojaActual];
  }

  constructor() {
   //GET para obtener la cabecera
  }

  agregar() {

  }

  navegar(direccion: string) {
    if (direccion === 'derecha') {
      this.hojaActual++;
      if (this.hojaActual >= this.hojas.length) {
        this.hojas.push(this.nuevaHoja());
      }
    } else if (direccion === 'izquierda' && this.hojaActual > 0) {
      this.hojaActual--;
    }
  }
  navegarInputs(event: KeyboardEvent, rowIndex: number, columna: string) {
    const currentInput = event.target as HTMLElement;
    let nextInput: HTMLElement | null = null;

    if (!currentInput.parentElement || !currentInput.parentElement.parentElement) {
      return;
    }

    const currentRow = currentInput.parentElement.parentElement;

    switch (event.key) {
      case 'ArrowUp':
        if (rowIndex > 0 && currentRow.previousElementSibling) {
          nextInput = currentRow.previousElementSibling.querySelector(`input[name=${columna}]`);
        }
        break;
      case 'ArrowDown':
        if (rowIndex < this.hoja.entradas.length - 1 && currentRow.nextElementSibling) {
          nextInput = currentRow.nextElementSibling.querySelector(`input[name=${columna}]`);
        }
        break;
      case 'ArrowLeft':
        nextInput = currentInput.parentElement.previousElementSibling?.querySelector('input') || null;
        break;
      case 'ArrowRight':
        nextInput = currentInput.parentElement.nextElementSibling?.querySelector('input') || null;
        break;
    }

    if (nextInput) {
      nextInput.focus();
      event.preventDefault();
    }
  }
}
