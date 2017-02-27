import { Injectable } from '@angular/core';

@Injectable()
export class ReferenceDataService {
impact:  {key: string, value: string}[] = [
        { key: '4', value: 'Negligible'},
        { key: '3', value: 'Marginal'},
        { key: '2', value: 'Critical'},
        { key: '1', value: 'Catastrophic'}
    ];

 frequency: { key: string, value: string }[] = [
        { key: 'F', value: 'Impossible'},
        { key: 'E', value: 'Improbable'},
        { key: 'D', value: 'Remote'},
        { key: 'C', value: 'Occasional'},
        { key: 'B', value: 'Probable'},
        { key: 'A', value: 'Frequent'}
    ];
}
