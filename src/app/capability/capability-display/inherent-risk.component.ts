import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-risk-widget',
    template: `
        <div class="p-2 {{'risk-intensity-' + classSuffix}}">
            <h4>Risk rating: {{risk}}</h4>
        </div>
        <p><small class="text-muted">{{message}}</small></p>
    `,
    styles: [
        '.risk-intensity-0 { background-color:#FFF; }',
        '.risk-intensity-1 { background-color:#00FFAA; }',
        '.risk-intensity-2 { background-color:#00C4FF; }',
        '.risk-intensity-3 { background-color:#FFEB00; }',
        '.risk-intensity-4 { background-color:#F00; }'
        ]
})

export class InherentRiskComponent implements OnChanges {
@Input() risk: string;
classSuffix: string;
message: string;


    ngOnChanges(changes: SimpleChanges) {
        const newRisk = changes['risk'].currentValue;
        switch (newRisk) {
            case 'Negligible':
                this.classSuffix = '0';
                this.message = 'Record only';
                break;
            case 'Low':
                this.classSuffix = '1';
                this.message = 'Risk acceptance requires sign-off';
                break;
            case 'Moderate':
                this.classSuffix = '2';
                this.message = 'Requires team lead sign-off';
                break;
            case 'Medium':
                this.classSuffix = '3';
                this.message = 'Requires Product Owner and Architectural sign-off';
                break;
            case 'High':
                this.classSuffix = '4';
                this.message = 'Risk must be mitigated or client waiver obtained';
                break;
            default:
                this.classSuffix = '0';
        }

    }
}
