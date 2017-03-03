import './shared/rxjs-extensions';
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
         CapabilityMatrixComponent,
         CapabilityDetailsComponent,
         CapabilityCardComponent,
         InherentRiskComponent,
         CapabilityDetailsResolver } from './capability/index';
import { CapabilityService } from './capability/capability.service';
import { ComponentListComponent } from './component/component-list/component-list.component';
import { ErrorComponent } from './errors/error.component';

import { ComponentService } from './component/component.service';
import { ReferenceDataService, ReferenceDataPipe  } from './shared/index';
import { RiskService } from './capability/risk.service';
import { ErrorService} from './errors/error.service';
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
    CapabilityMatrixComponent,
    CapabilityCardComponent,
    CapabilityDetailsComponent,
    ComponentListComponent,
    InherentRiskComponent,
    ErrorComponent,
    ReferenceDataPipe
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
    CapabilityDetailsResolver,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
