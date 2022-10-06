import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RxjsLearnComponent } from './rxjs-learn/rxjs-learn.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HigherOrderObservablesComponent } from './higher-order-observables/higher-order-observables.component';
import { SubjectsRxjsComponent } from './subjects-rxjs/subjects-rxjs.component';
import { HostBindDirective } from './_directives/host-bind.directive';

@NgModule({
  declarations: [
    AppComponent,
    RxjsLearnComponent,
    HigherOrderObservablesComponent,
    SubjectsRxjsComponent,
    HostBindDirective
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
