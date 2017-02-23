import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { IComponent } from '../model/capability.model';

const COMPONENTS: IComponent[] = [
    { id: '1', name: 'Component 1', description: 'Description 1'},
    { id: '2', name: 'Component 2', description: 'Description 2'},
    { id: '3', name: 'Component 3', description: 'Description 3'},
    { id: '4', name: 'Component 4', description: 'Description 4'},
    { id: '5', name: 'Component 5', description: 'Description 6'},
    { id: '6', name: 'Component 6', description: 'Description 6'},
    { id: '7', name: 'Component 7', description: 'Description 7'}
];

@Injectable()
export class ComponentService {
    constructor() { }

    getComponents(): Observable<IComponent[]> {

        const subject = new Subject<IComponent[]> ();
        setTimeout(() => {
            subject.next(COMPONENTS);
            subject.complete();
        }, 1000);
        return subject;
    }
}



