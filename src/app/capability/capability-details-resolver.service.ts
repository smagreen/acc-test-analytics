import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CapabilityService } from './capability.service';
import { AttributeService } from '../attribute/attribute.service';
import { ComponentService } from '../component/component.service';

@Injectable()
export class CapabilityDetailsResolver implements Resolve<any> {
    constructor(private router: Router, private capabilityService: CapabilityService,
        private componentService: ComponentService, private attributeService: AttributeService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        console.log('Resolving route: ', route.params['id']);
        //  return this.capabilityService.getCapability(route.params['id']);

        return Observable.forkJoin(
            this.capabilityService.getCapability(route.params['id']),
            this.componentService.getComponents(),
            this.attributeService.getAttributes()
      ).map(res => ({ 'capability': res[0], 'components': res[1], 'attributes': res[2]}) );

    }
}
