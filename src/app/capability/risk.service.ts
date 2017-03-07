import { Injectable } from '@angular/core';
import { ReferenceDataService } from '../shared/index';

@Injectable()
export class RiskService {
riskStatements = ['Negligible', 'Low', 'Moderate', 'Medium', 'High'];

    constructor(private refData: ReferenceDataService ) {}

    quickRiskCalculator(frequency = 'F', impact = '1') {
        const factor = this.getRiskStatement(frequency + impact);

        return factor ? factor.risk : 'Not specified';
    }

    private getRiskStatement(fi: string) {

        // Frequency, Impact
        const riskMatrix = [
            {cell: 'F4', risk: this.riskStatements[0] },
            {cell: 'F3', risk: this.riskStatements[0] },
            {cell: 'F2', risk: this.riskStatements[0] },
            {cell: 'F1', risk: this.riskStatements[0] },

            {cell: 'E4', risk: this.riskStatements[1] },
            {cell: 'E3', risk: this.riskStatements[1] },
            {cell: 'E2', risk: this.riskStatements[1] },
            {cell: 'E1', risk: this.riskStatements[1] },

            {cell: 'D4', risk: this.riskStatements[1] },
            {cell: 'D3', risk: this.riskStatements[1] },
            {cell: 'D2', risk: this.riskStatements[1] },
            {cell: 'D1', risk: this.riskStatements[2] },

            {cell: 'C4', risk: this.riskStatements[1] },
            {cell: 'C3', risk: this.riskStatements[1] },
            {cell: 'C2', risk: this.riskStatements[3] },
            {cell: 'C1', risk: this.riskStatements[4] },

            {cell: 'B4', risk: this.riskStatements[1] },
            {cell: 'B3', risk: this.riskStatements[2] },
            {cell: 'B2', risk: this.riskStatements[3] },
            {cell: 'B1', risk: this.riskStatements[4] },

            {cell: 'A4', risk: this.riskStatements[2] },
            {cell: 'A3', risk: this.riskStatements[3] },
            {cell: 'A2', risk: this.riskStatements[4] },
            {cell: 'A1', risk: this.riskStatements[4] },
        ];

        return riskMatrix.find(r => r.cell === fi );
    }

    public defectRiskCalculator(type1: number, type2: number, type3: number) {
        const total = type1 + type2 + type3;

        if (type1 > 0) {
             return this.riskStatements[this.riskStatements.length - 1 ];
        }

        if (type2 > 0) {
            const pctType2 = (type2 / total );
            if (pctType2 > .5) {
                return this.riskStatements[this.riskStatements.length - 2 ];
            }

            return  this.riskStatements[this.riskStatements.length - 3 ];
        }

        if (type3 > 0) {
            return this.riskStatements[this.riskStatements.length - 4 ];
        }

        return this.riskStatements[0];
    }

}

