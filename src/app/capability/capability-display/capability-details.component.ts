import 'rxjs/add/operator/debounceTime';
import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IAttribute, ICapability, IComponent } from '../../model/capability.model';
import { ReferenceDataService } from '../reference-data.service';
import { RiskService } from '../risk.service';
import { CapabilityService } from '../capability.service';


@Component({
    templateUrl: './capability-details.component.html'
})

export class CapabilityDetailsComponent implements OnInit {
    capability: ICapability;
    capabilityForm: FormGroup;
    riskStatement: string;
    referenceData: any = {};
    errorMessage: string;

    constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
         private refData: ReferenceDataService, private capabilityService: CapabilityService , private riskService: RiskService) {

        this.capabilityForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
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
            this.referenceData.frequency = this.refData.frequency;
            this.referenceData.impact = this.refData.impact;
            this.onCapabilityRetrieved();
        });

    }

      onCapabilityRetrieved() {
        if (this.capabilityForm) {
            this.capabilityForm.reset();
        }

        if (this.capability) {
            this.capabilityForm.patchValue({
                name: this.capability.name,
                description: this.capability.description,
                componentId: this.capability.componentId,
                attributeId: this.capability.attributeId,
                frequencyId: this.capability.frequencyId,
                impactId: this.capability.impactId
            });
         }

        this.capabilityForm.get('frequencyId').valueChanges.subscribe(value => this.calculateInherentRisk());
        this.capabilityForm.get('impactId').valueChanges.subscribe(value => this.calculateInherentRisk());
        this.calculateInherentRisk();
     }

     calculateInherentRisk() {
        const f = this.capabilityForm.get('frequencyId').value;
        const i = this.capabilityForm.get('impactId').value;
        this.riskStatement = (f && i) ? this.riskService.quickRiskCalculator(f, i) : 'N/A';
     }

    save() {
        if (this.capabilityForm.dirty && this.capabilityForm.valid) {
             this.capabilityService.saveCapability(Object.assign({}, this.capability, this.capabilityForm.value))
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.capabilityForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.capabilityForm.reset();
        this.router.navigate(['/capabilities']);
    }

    cancel() {
        this.onSaveComplete();
    }
}
