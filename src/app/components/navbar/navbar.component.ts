import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private keycloak: KeycloakService, private route: Router) { }

  logout() {
    localStorage.clear();
    //this.route.navigate(["/"])
    this.keycloak.logout("http://localhost:4200");
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

  entityFlag: boolean = false;
  entityFlagChange() {
    this.entityFlag = !this.entityFlag;
  }

}
