import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ICapability } from '../../model/capability.model';

@Component({
    template: `<p>I'm here: {{ capability | json}}</p>`
})

export class CapabilityDetailsComponent implements OnInit {
    capability: ICapability;
    addMode: boolean;

    constructor(private route: ActivatedRoute) {  }

     ngOnInit() {
        this.route.data.forEach((data) => {
            this.capability = data['capability'];
            this.addMode = false;
        });
    }
}
