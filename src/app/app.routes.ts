import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AttributeListComponent } from './attribute/attribute-list/attribute-list.component';
import {    CapabilityListComponent,
            CapabilityDetailsResolver,
            CapabilityDetailsComponent,
            CapabilityMatrixComponent
        } from './capability/index';
import { ComponentListComponent } from './component/component-list/component-list.component';

import { ErrorComponent } from './errors/error.component';

export const appRoutes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'attributes', component: AttributeListComponent },
    { path: 'components', component: ComponentListComponent },
    { path: 'capability/:id', component: CapabilityDetailsComponent, resolve: {capability: CapabilityDetailsResolver } },
    { path: 'capabilities/matrix', component: CapabilityMatrixComponent },
    { path: 'capabilities', component: CapabilityListComponent },
    { path: '404', component: ErrorComponent },
    { path: 'error/:message', component: ErrorComponent },
    { path: 'error', component: ErrorComponent },
    { path: '', redirectTo: '/about', pathMatch: 'full' }
];
