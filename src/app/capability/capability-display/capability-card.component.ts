import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'app-capability-card',
    templateUrl: './capability-card.component.html',
    styles: ['.bd-example {border: solid #f7f7f9;  }']
})
export class CapabilityCardComponent implements OnChanges {
    @Input() capability: any;

    ngOnChanges() {
        // console.log('CapabilityCardComponent onChange: ', this.capability);
    }
}
