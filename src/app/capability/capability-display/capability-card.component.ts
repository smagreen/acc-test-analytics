import { Component, Input, OnChanges } from '@angular/core';
import { ReferenceDataService, ReferenceDataPipe } from '../../shared/index';

@Component({
    selector: 'app-capability-card',
    templateUrl: './capability-card.component.html',
    styles: ['.bd-example {border: solid #f7f7f9;  }']

})
export class CapabilityCardComponent implements OnChanges {
    @Input() capability: any;
    impact: any;
    frequency: any;

    constructor(private refData: ReferenceDataService) {
        this.impact = refData.impact;
        this.frequency = refData.frequency;
    }

    ngOnChanges() {
        // console.log('CapabilityCardComponent onChange: ', this.capability);
    }
}
