import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

@Injectable()
export class CapabilityListResolver implements Resolve<any> {
    constructor(private router: Router) { }

    resolve() {
        return null;
    }
}
