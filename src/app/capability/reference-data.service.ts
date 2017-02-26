import { Injectable } from '@angular/core';

@Injectable()
export class ReferenceDataService {
impact:  {key: string, value: string}[] = [
        { key: '1', value: 'None'},
        { key: '2', value: 'Minimal/Negligible'},
        { key: '3', value: 'Some/Marginal'},
        { key: '4', value: 'Considerable/Critical'},
        { key: '5', value: 'Maximal/Catastrophic'}
    ];
   
 frequency: { key: string, value: string }[] = [
        { key: '1', value: 'Never/Impossible'},
        { key: '2', value: 'Rarely/Improbable'},
        { key: '3', value: 'Seldom/Remote'},
        { key: '4', value: 'Occasionally/Probable'},
        { key: '5', value: 'Often/Frequent'}
    ];
}
