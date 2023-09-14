import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Tap1Component } from './components/initial-config/tap1/tap1.component';
import { Tap2Component } from './components/initial-config/tap2/tap2.component';
import { Tap3Component } from './components/initial-config/tap3/tap3.component';
import { Tap4Component } from './components/initial-config/tap4/tap4.component';
import { MyButtonComponent } from './components/general-components/my-button/my-button.component';
import { MyTextfieldComponent } from './components/general-components/my-textfield/my-textfield.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    Tap1Component,
    Tap2Component,
    Tap3Component,
    Tap4Component,
    MyButtonComponent,
    MyTextfieldComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
