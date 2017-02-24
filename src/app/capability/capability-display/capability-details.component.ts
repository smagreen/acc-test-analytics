import 'rxjs/add/operator/debounceTime';
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
    referenceData: any = {};

    constructor(private route: ActivatedRoute, private fb: FormBuilder, private refData: ReferenceDataService) {
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

        this.route.data.forEach((data) => {
            this.capability = data['capability'].capability;
            this.referenceData.attrs =  data['capability'].attributes;
            this.referenceData.comps = data['capability'].components;
            this.referenceData.frequency = data['capability'].referenceData.frequency;
            this.referenceData.impact = data['capability'].referenceData.impact;
            this.onCapabilityRetrieved();
        });

        this.capabilityForm.get('frequencyId').valueChanges.subscribe(value => console.log(value));
        this.capabilityForm.get('description').valueChanges.debounceTime(1000).subscribe(value => console.log('Description:', value));
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
