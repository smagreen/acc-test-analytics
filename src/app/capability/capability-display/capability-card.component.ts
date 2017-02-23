import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'app-capability-card',
    templateUrl: './capability-card.component.html'
})
export class CapabilityCardComponent implements OnChanges {
    @Input() capability: any;

    ngOnChanges() {
        // console.log('CapabilityCardComponent onChange: ', this.capability);
    }
}
