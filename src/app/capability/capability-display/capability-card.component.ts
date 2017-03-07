import { Component, Input, OnInit } from '@angular/core';
import { ICapability } from '../../model/capability.model';
import { ReferenceDataService, ReferenceDataPipe } from '../../shared/index';
import { RiskService } from '../risk.service';


@Component({
    selector: 'app-capability-card',
    templateUrl: './capability-card.component.html',
    styles: ['.bd-example {border: solid #f7f7f9;  }']

})
export class CapabilityCardComponent implements OnInit {
    @Input() capability = <ICapability>null;
    impact: any;
    frequency: any;
    executedTests = 0;
    failedTests = 0;
    passRate = 0;
    defectRisk = 'N/A';

    constructor(private refData: ReferenceDataService, private riskService: RiskService) {
        this.impact = refData.impact;
        this.frequency = refData.frequency;
    }

    getBadgeClasses(riskDescription: string) {
        let badgeOn = false;

        switch (riskDescription) {
            case 'High':
            case 'Medium':
            case 'Moderate':
                badgeOn = true;
                break;
            default: // 'Negligible', 'Low'
                badgeOn = false;
        }

        const classes = {
            badge: badgeOn,
            'badge-danger':  riskDescription === 'High',
            'badge-warning' : riskDescription === 'Medium',
            'badge-info': riskDescription === 'Moderate'
        };
        return classes;
    }

    calculateTestResults() {
        if (this.capability.testSection && this.capability.testSection.testCases) {
            this.capability.testSection.testCases.forEach(element => {
                if (element.results) {
                    this.executedTests++;
                    this.failedTests += element.results.filter(r => r.result !== 'Pass').length;
                }
            });
            this.passRate = ((this.executedTests - this.failedTests) / this.executedTests) * 100;
        }
    }

    ngOnInit() {
        this.calculateTestResults();
        if (this.capability && this.capability.defects) {
            const d = this.capability.defects;
            this.defectRisk = this.riskService.defectRiskCalculator(d.type1, d.type2, d.type3);
        }
    }

    onTestLinkClick(event) {
        // tslint:disable-next-line:max-line-length
        event.preventDefault();
        let id = 25011;
        window.open(`http://testrail.devel.iress.com.au/index.php?/suites/view/6236&group_by=cases:section_id&group_order=asc&group_id=${id}`, '_TestRail');
    }
}
