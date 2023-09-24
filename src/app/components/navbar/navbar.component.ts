import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  urlPfp = "../.././../assets/pfp.svg";

  logout() {
    console.log('Cerrar sesión');
  }

}
