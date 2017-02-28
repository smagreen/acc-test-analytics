import { Component, Input, OnChanges } from '@angular/core';
import { MatrixElement } from '../../model/capability.model';


@Component({
    selector: 'app-capability-display',
    templateUrl: './capability-display.component.html'
})
export class CapabilityDisplayComponent implements OnChanges {
    @Input() matrixElement: MatrixElement;

    ngOnChanges() {
        // console.log('ngOnChanges CapabilityDisplayComponent', this.matrixElement);
    }
}
