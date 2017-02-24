import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CapabilityService } from './capability.service';
import { AttributeService } from '../attribute/attribute.service';
import { ComponentService } from '../component/component.service';
import { ReferenceDataService } from '../capability/reference-data.service';

@Injectable()
export class CapabilityDetailsResolver implements Resolve<any> {
    constructor ( private router: Router, private capabilityService: CapabilityService,
            private componentService: ComponentService, private attributeService: AttributeService,
            private refData: ReferenceDataService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
      return Observable.forkJoin(
            this.capabilityService.getCapability(route.params['id']),
            this.componentService.getComponents(),
            this.attributeService.getAttributes(),
            this.refData.getReferenceData()
      ).map(res => ({
            capability: res[0],
            components: res[1],
            attributes: res[2],
            referenceData: {
                frequency: res[3].get('frequency'),
                impact: res[3].get('impact')
            }})
        );
    }
}
