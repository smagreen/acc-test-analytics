import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IAttribute, ICapability, IComponent } from '../../model/capability.model';
import { ReferenceDataService } from '../reference-data.service';

@Component({
    templateUrl: './capability-details.component.html'
})

export class CapabilityDetailsComponent implements OnInit {
    capability: ICapability;
    capabilityForm: FormGroup;
    referenceData: { attrs: any, comps: any, frequency: any, impact: any };

    constructor(private route: ActivatedRoute, private fb: FormBuilder, private refData: ReferenceDataService) {
        this.referenceData = { attrs: null , comps: null, frequency: null, impact: null };

        this.capabilityForm = this.fb.group({
            capabilityName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            description: ['', [Validators.maxLength(500)]],
            componentId: ['', [Validators.required]],
            attributeId: ['', [Validators.required]],
            frequencyId: ['', [Validators.required]],
            impactId: ['', [Validators.required]]
        });
     }

     ngOnInit() {

        this.refData.getReferenceData().subscribe(
            res => {
                this.referenceData.frequency = res.get('frequency');
                this.referenceData.impact = res.get('impact');
            },
            e => { console.log('Reference Data error', e); },
            () => {console.log('reference data done:'); }
        );

        this.route.data.forEach((data) => {
            this.capability = data['capability'].capability;
            this.referenceData.attrs =  data['capability'].attributes;
            this.referenceData.comps = data['capability'].components;
            this.onCapabilityRetrieved();
        });
    }

     onCapabilityRetrieved() {
        if (this.capabilityForm) {
            this.capabilityForm.reset();
        }

        if (this.capability) {
            this.capabilityForm.patchValue({
                capabilityName: this.capability.name,
                description: this.capability.description,
                componentId: this.capability.componentId,
                attributeId: this.capability.attributeId,
                frequencyId: undefined,
                impactId: undefined
            });
         }
     }

    save() {
        console.log('Save pressed');
    }
}
