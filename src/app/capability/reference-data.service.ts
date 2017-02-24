import 'rxjs/add/operator/delay';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


const map = new Map<string, any>();
map.set('frequency', [
        { key: '1', value: 'Never/Impossible'},
        { key: '2', value: 'Rarely/Improbable'},
        { key: '3', value: 'Seldom/Remote'},
        { key: '4', value: 'Occasionally/Probable'},
        { key: '5', value: 'Often/Frequent'}]);

map.set('impact', [
        { key: '1', value: 'None'},
        { key: '2', value: 'Minimal/Negligible'},
        { key: '3', value: 'Some/Marginal'},
        { key: '4', value: 'Considerable/Critical'},
        { key: '5', value: 'Maximal/Catastrophic'}
    ]);


@Injectable()
export class ReferenceDataService {
    getReferenceData(): Observable< Map<string, any>> {

        return Observable.of(map).delay(500);

    }
}
