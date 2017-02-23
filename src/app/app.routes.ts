import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AttributeListComponent } from './attribute/attribute-list/attribute-list.component';
import { CapabilityListComponent, CapabilityDetailsResolver, CapabilityDetailsComponent } from './capability/index';
import { ComponentListComponent } from './component/component-list/component-list.component';

import { Error404Component } from './errors/404.component';

export const appRoutes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'attributes', component: AttributeListComponent },
    { path: 'components', component: ComponentListComponent },
    { path: 'capability/:id', component: CapabilityDetailsComponent, resolve: {capability: CapabilityDetailsResolver } },
    { path: 'capabilities', component: CapabilityListComponent },
    { path: '404', component: Error404Component },
    { path: 'error/:message', component: Error404Component },
    { path: 'error', component: Error404Component },
    { path: '', redirectTo: '/about', pathMatch: 'full' }
];
