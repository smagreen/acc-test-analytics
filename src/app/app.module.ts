import './rxjs-extensions';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavbarComponent } from './nav/navbar.component';
import { AboutComponent } from './about/about.component';
import { AttributeListComponent } from './attribute/attribute-list/attribute-list.component';
import { AttributeService } from './attribute/attribute.service';
import { CapabilityListComponent,
         CapabilityDetailsComponent,
         CapabilityDisplayComponent,
         CapabilityCardComponent,
         InherentRiskComponent,
         CapabilityDetailsResolver } from './capability/index';
import { CapabilityService } from './capability/capability.service';
import { ComponentListComponent } from './component/component-list/component-list.component';
import { Error404Component } from './errors/404.component';

import { ComponentService } from './component/component.service';
import { ReferenceDataService } from './capability/reference-data.service';
import { RiskService } from './capability/risk.service';

import { appRoutes } from './app.routes';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CapabilityData } from './mock/capability.data';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    AttributeListComponent,
    CapabilityListComponent,
    CapabilityDisplayComponent,
    CapabilityCardComponent,
    CapabilityDetailsComponent,
    ComponentListComponent,
    InherentRiskComponent,
    Error404Component
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    InMemoryWebApiModule.forRoot(CapabilityData),
  ],
  providers: [
    {
        provide: LOCALE_ID,
        useValue: 'en-gb'
    },
    ComponentService,
    AttributeService,
    CapabilityService,
    ReferenceDataService,
    RiskService,
    CapabilityDetailsResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
