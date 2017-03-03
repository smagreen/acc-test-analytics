import '../../shared/rxjs-extensions';
import { Component, OnInit, OnDestroy, ViewChildren, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormControlName, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { IAttribute, ICapability, IComponent } from '../../model/capability.model';
import { ReferenceDataService, GenericValidator } from '../../shared/index';
import { RiskService } from '../risk.service';
import { CapabilityService } from '../capability.service';


@Component({
    templateUrl: './capability-details.component.html'
})

export class CapabilityDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
     @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    capability: ICapability;
    capabilityForm: FormGroup;
    genericValidator: GenericValidator;
    riskStatement: string;
    referenceData: any = {};
    errorMessage: string;
    paramsSubscription: Subscription;

     // Use with the generic validation message class
    private displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };

    constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
         private refData: ReferenceDataService, private capabilityService: CapabilityService , private riskService: RiskService) {

        this.capabilityForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            description: ['', [Validators.maxLength(500)]],
            componentId: ['', [Validators.required]],
            attributeId: ['', [Validators.required]],
            risk: this.fb.group({
                frequencyId: ['', [Validators.required]],
                impactId: ['', [Validators.required]]}
            )
        });

        // Defines all of the validation messages for the form.
        this.validationMessages = {
            name: {
                required: 'Product name is required.',
                minlength: 'Product name must be at least five characters.',
                maxlength: 'Product name cannot exceed 50 characters.'
            },
            description: {
                maxlength: 'Product description cannot exceed 500 characters.'
            },
            attributeId: {
                required: 'Attribute is required'
            },
            componentId: {
                required: 'Component is required'
            },
            frequencyId: {
                required: 'Probability is required'
            },
            impactId: {
                required: 'Impact is required'
            }
        };

        // Define an instance of the validator for use with this form,
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit() {
        this.paramsSubscription = this.route.data.subscribe((data) => {
            this.capability = data['capability'].capability;
            this.referenceData.attrs =  data['capability'].attributes;
            this.referenceData.comps = data['capability'].components;
            this.referenceData.frequency = this.refData.frequency;
            this.referenceData.impact = this.refData.impact;
            this.onCapabilityRetrieved();
        });
    }

     ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.capabilityForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.capabilityForm);
        });
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }

    onCapabilityRetrieved() {
        if (this.capabilityForm) {
            this.capabilityForm.reset();
        }

        if (this.capability) {
            this.capabilityForm.patchValue({
                name: this.capability.name,
                description: this.capability.description,
                attributeId: this.capability.attribute.id,
                componentId: this.capability.component.id,
                risk: {
                    frequencyId: this.capability.risk ? this.capability.risk.frequencyId : undefined,
                    impactId: this.capability.risk ? this.capability.risk.impactId : undefined
                }
            });
         }

        this.calculateInherentRisk();
        this.capabilityForm.get('risk.frequencyId').valueChanges.subscribe(value => this.calculateInherentRisk());
        this.capabilityForm.get('risk.impactId').valueChanges.subscribe(value => this.calculateInherentRisk());
    }

    calculateInherentRisk() {
        const f = this.capabilityForm.get('risk.frequencyId').value;
        const i = this.capabilityForm.get('risk.impactId').value;
        this.riskStatement = (f && i) ? this.riskService.quickRiskCalculator(f, i) : 'N/A';
    }

    saveCapability() {
        if (this.capabilityForm.dirty && this.capabilityForm.valid) {
             const x = Object.assign({}, this.capability, this.capabilityForm.value);
             // Hack => Use convenience values
             x.component.id = x.componentId;
             x.attribute.id = x.attributeId;
             delete(x.componentId);
             delete(x.attributeId);
             // Hack
             this.capabilityService.saveCapability(x)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.capabilityForm.dirty) {
            // this.onSaveComplete();
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
