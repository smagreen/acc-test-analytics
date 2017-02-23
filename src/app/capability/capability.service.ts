import '../rxjs-extensions';
import { Injectable } from '@angular/core';
import { ICapability, IComponent, IAttribute, CapabilityMatrix, MatrixElement } from '../model/capability.model';
import { ComponentService } from '../component/component.service';
import { AttributeService } from '../attribute/attribute.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


const CAPABILITIES: ICapability[] = [
    { id: '11', attributeId: '1', componentId: '1', name: 'Capability A1 - C1', description: 'This is the description for Capability id:11'},
    { id: '112', attributeId: '1', componentId: '1', name: 'Capability 2 A1 - C1', description: ''},
    { id: '12', attributeId: '1', componentId: '2', name: 'Capability A1 - C2', description: ''},
    { id: '13', attributeId: '1', componentId: '3', name: 'Capability A1 - C3', description: ''},
    { id: '21', attributeId: '2', componentId: '1', name: 'Capability A2 - C1', description: ''},
    { id: '22', attributeId: '2', componentId: '2', name: 'Capability A2 - C2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.'},
    { id: '24', attributeId: '2', componentId: '4', name: 'Capability A2 - C4', description: ''},
    { id: '64', attributeId: '6', componentId: '4', name: 'Capability A6 - C4', description: ''},
    { id: '65', attributeId: '6', componentId: '4', name: 'Capability A6 - C4', description: ''},
    { id: '25', attributeId: '2', componentId: '5', name: 'Capability A2 - C5', description: ''},
    { id: '26', attributeId: '2', componentId: '6', name: 'Capability A2 - C6', description: ''},
    { id: '33', attributeId: '2', componentId: '6', name: 'Capability 2 A2 - C6', description: ''},
    { id: '34', attributeId: '2', componentId: '6', name: 'Capability 3 A2 - C6', description: ''},
    { id: '35', attributeId: '2', componentId: '6', name: 'Capability 4 A2 - C6', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.'},
    { id: '36', attributeId: '2', componentId: '6', name: 'Capability 5 A2 - C6', description: ''},
    { id: '37', attributeId: '2', componentId: '6', name: 'Capability 6 A2 - C6', description: ''},
    { id: '38', attributeId: '2', componentId: '6', name: 'Capability 7 A2 - C6', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.'}
];

@Injectable()
export class CapabilityService {

    constructor (private componentService: ComponentService, private attributeService: AttributeService) { }

    private getCapabilities(): Observable<ICapability[]> {

        const subject = new Subject<ICapability[]> ();
        setTimeout(() => {
            subject.next(CAPABILITIES);
            subject.complete();
        }, 1000);
        return subject;
    }

     getCapabilityData(): Observable<CapabilityMatrix> {

       return Observable.forkJoin(
            this.getCapabilities(),
            this.componentService.getComponents(),
            this.attributeService.getAttributes()
      ).map(res => this.resolveMatrix( res[2], res[1], res[0]));

    }

    getCapability(id: string): Observable<ICapability> {
        return Observable.of(CAPABILITIES.find(c => c.id === id));
    }

    // build the matrix - resolving attribute and component ids to the relevant objects
    // easier to do on the server - but this is a hack for now!
    resolveMatrix(attrList: IAttribute[], componentList: IComponent[], capsList: ICapability[]): CapabilityMatrix {
        const matrix: CapabilityMatrix = { elements: [], attributes: attrList, components: componentList };

        capsList.forEach(c => {
            let element: MatrixElement = matrix.elements.find(e => (e.attribute.id === c.attributeId && e.component.id === c.componentId));
            if (!element) {
                element = new MatrixElement(c.id,
                 componentList.find( co => co.id === c.componentId),
                 attrList.find( a => a.id === c.attributeId), [c]);
                 matrix.elements.push(element);
            } else {
                element.capabilities.push(c);
            }
        });

        return matrix;
    }

}
