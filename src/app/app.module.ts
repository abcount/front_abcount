import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Tap1Component } from './components/initial-config/tap1/tap1.component';
import { Tap2Component } from './components/initial-config/tap2/tap2.component';
import { Tap3Component } from './components/initial-config/tap3/tap3.component';
import { Tap4Component } from './components/initial-config/tap4/tap4.component';
import {FormsModule} from "@angular/forms";
import {SebastianModule} from "./modules/SebastianModule";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {AleModule} from "./modules/AleModule";
import {CarlosModule} from "./modules/CarlosModule";
import {MicaModule} from "./modules/MicaModule";
import {AndreModule} from "./modules/AndreModule";
import { ProgressComponent } from './components/general-components/progress/progress.component';
import { faDatabase, faBuilding, faCogs, faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ReactiveFormsModule } from '@angular/forms';
import { CircularButtonComponent } from './components/general-components/circular-button/circular-button.component';
import { initializeKeycloak } from '../app/config/keycloak.init'
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';



@NgModule({
  declarations: [
    AppComponent,
    Tap1Component,
    Tap2Component,
    Tap3Component,
    Tap4Component,
    ProgressComponent,
    CircularButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    SebastianModule,
    MatTreeModule,
    MatIconModule,
    AleModule,
    AndreModule,
    CarlosModule,
    MicaModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    /*KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
