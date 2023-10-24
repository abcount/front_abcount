import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  urlPfp = "../.././../assets/pfp.svg";
  isDropdownOpen = false;
  isDropdownOpen2 = false;

  constructor(private keycloak: KeycloakService) { }

  logout() {
    localStorage.clear();
    this.keycloak.logout();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleDropdown2() {
    this.isDropdownOpen2 = !this.isDropdownOpen2;
  }

  auxiliarFlag: boolean = false;
  auxiliarFlagChange() {
    this.auxiliarFlag = !this.auxiliarFlag;
  }

}
