import './rxjs-extensions';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavbarComponent } from './nav/navbar.component';
import { AboutComponent } from './about/about.component';
import { AttributeListComponent } from './attribute/attribute-list/attribute-list.component';
import { AttributeService } from './attribute/attribute.service';
import { CapabilityListComponent, CapabilityListResolver } from './capability/index';
import { CapabilityService } from './capability/capability.service';
import { ComponentListComponent } from './component/component-list/component-list.component';
import { Error404Component } from './errors/404.component';

import { ComponentService } from './component/component.service';

import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    AttributeListComponent,
    CapabilityListComponent,
    ComponentListComponent,
    Error404Component
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ComponentService,
    AttributeService,
    CapabilityService,
    CapabilityListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
