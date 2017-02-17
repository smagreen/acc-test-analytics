import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { IAttribute } from '../shared/index';

const ATTRIBUTES: IAttribute[] = [
    { id: '1', name: 'Attribute 1', description: 'Description 1'},
    { id: '2', name: 'Attribute 2', description: 'Description 2'},
    { id: '3', name: 'Attribute 3', description: 'Description 3'},
    { id: '4', name: 'Attribute 4', description: 'Description 4'},
    { id: '5', name: 'Attribute 5', description: 'Description 6'},
    { id: '6', name: 'Attribute 6', description: 'Description 6'},
];

@Injectable()
export class AttributeService {
    constructor() { }

    getAttributes(): Observable<IAttribute[]> {

        const subject = new Subject<IAttribute[]> ();
        setTimeout(() => {
            subject.next(ATTRIBUTES);
            subject.complete();
        }, 1000);
        return subject;
    }
}



