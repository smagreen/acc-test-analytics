import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AttributeService } from '../../attribute/attribute.service';
import { ComponentService } from '../../component/component.service';
import { CapabilityService } from '../../capability/capability.service';

@Injectable()
export class CapabilityListResolver implements Resolve<any> {
    constructor(private router: Router,
                 attributeService: AttributeService,
                 componentService: ComponentService,
                 capabilityService: CapabilityService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return 
    }
}
