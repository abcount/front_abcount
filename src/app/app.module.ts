import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { MatTreeModule } from "@angular/material/tree";
import { MatIconModule } from "@angular/material/icon";

// Modulos
import { AleModule } from "./modules/AleModule";
import { AndreModule } from "./modules/AndreModule";
import { CarlosModule } from "./modules/CarlosModule";
import { MicaModule } from "./modules/MicaModule";
import { SebastianModule } from "./modules/SebastianModule";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

// Keycloak
import { initializeKeycloak } from '../app/config/keycloak.init';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

// Componentes
// Configuración inicial
import { ProgressComponent } from './components/general-components/progress/progress.component';
import { Tap1Component } from './components/initial-config/tap1/tap1.component';
import { Tap2Component } from './components/initial-config/tap2/tap2.component';
import { Tap3Component } from './components/initial-config/tap3/tap3.component';
import { Tap4Component } from './components/initial-config/tap4/tap4.component';
import { CircularButtonComponent } from './components/general-components/circular-button/circular-button.component';
// Comprobantes contables
import { AccountingVoucherViewComponent } from './components/accounting-voucher/accounting-voucher-view/accounting-voucher-view.component';
import { AccountingVoucherAddComponent } from './components/accounting-voucher/accounting-voucher-add/accounting-voucher-add.component';
import { DiaryBookFormComponent } from './components/reports/diary-book/diary-book-form/diary-book-form.component';
import { BalanceSheetComponent } from './components/reports/balance-sheet/balance-sheet-form/balance-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgressComponent,
    Tap1Component,
    Tap2Component,
    Tap3Component,
    Tap4Component,
    CircularButtonComponent,
    AccountingVoucherViewComponent,
    AccountingVoucherAddComponent,
    DiaryBookFormComponent,
    BalanceSheetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTreeModule,
    MatIconModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    AleModule,
    AndreModule,
    MicaModule,
    SebastianModule,
     KeycloakAngularModule
   ],
   providers: [
     {
       provide: APP_INITIALIZER,
       useFactory: initializeKeycloak,
       multi: true,
       deps: [KeycloakService]
     }
  ],
  exports: [
    CircularButtonComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
