import { Injectable } from '@angular/core';
import { ReferenceDataService } from './reference-data.service';


@Injectable()
export class RiskService {
    constructor(private refData: ReferenceDataService ) {}

    quickRiskCalculator(frequency = 'F', impact = '1') {
        const factor = this.getRiskStatement(frequency + impact);

        return factor ? factor.risk : 'Not specified';
    }

    private getRiskStatement(fi: string) {
        const riskStatements = ['Negligible', 'Low', 'Moderate', 'Medium', 'High'];
        // Frequency, Impact
        const riskMatrix = [
            {cell: 'F4', risk: riskStatements[0] },
            {cell: 'F3', risk: riskStatements[0] },
            {cell: 'F2', risk: riskStatements[0] },
            {cell: 'F1', risk: riskStatements[0] },

            {cell: 'E4', risk: riskStatements[1] },
            {cell: 'E3', risk: riskStatements[1] },
            {cell: 'E2', risk: riskStatements[1] },
            {cell: 'E1', risk: riskStatements[1] },

            {cell: 'D4', risk: riskStatements[1] },
            {cell: 'D3', risk: riskStatements[1] },
            {cell: 'D2', risk: riskStatements[1] },
            {cell: 'D1', risk: riskStatements[2] },

            {cell: 'C4', risk: riskStatements[1] },
            {cell: 'C3', risk: riskStatements[1] },
            {cell: 'C2', risk: riskStatements[3] },
            {cell: 'C1', risk: riskStatements[4] },

            {cell: 'B4', risk: riskStatements[1] },
            {cell: 'B3', risk: riskStatements[2] },
            {cell: 'B2', risk: riskStatements[3] },
            {cell: 'B1', risk: riskStatements[4] },

            {cell: 'A4', risk: riskStatements[2] },
            {cell: 'A3', risk: riskStatements[3] },
            {cell: 'A2', risk: riskStatements[4] },
            {cell: 'A1', risk: riskStatements[4] },
        ];

        return riskMatrix.find(r => r.cell === fi );
    }
}

