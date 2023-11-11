import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-closing-sheet',
  templateUrl: './closing-sheet.component.html',
  styleUrls: ['./closing-sheet.component.css']
})
export class ClosingSheetComponent {

  backgroundPopup: boolean = false;
  firstPopup: boolean = false;
  secondPopup: boolean = false;
  loading: boolean = false;
  final: boolean = false;
  titleMessage = '¡Enhorabuena!';
  message = 'Se ha completado el proceso de cierre de manera exitosa.';
  messageIcon = 'fa-regular fa-circle-check gradient';

  constructor(private router: Router) { }

  openFirstPopup(){
    this.backgroundPopup = true;
    this.firstPopup = true;
  }

  openSecondPopup(){
    this.firstPopup = false;
    this.secondPopup = true;
  }

  cancel(){
    this.backgroundPopup = false;
    this.firstPopup = false;
    this.secondPopup = false;
  }

  closingSheetProcess() {
    console.log("Cierre de ejercicio");
    this.secondPopup = false;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.final = true;
    }, 3000);
  }

  end() {
    this.final = false;
    this.backgroundPopup = false;
    this.router.navigate(['/home']);
  }

}
