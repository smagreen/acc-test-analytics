import '../rxjs-extensions';
import { Injectable } from '@angular/core';
import { ICapability, IComponent, IAttribute } from '../shared/index';
import { CapabilityTable } from '../shared/capability-table.model';
import { ComponentService } from '../component/component.service';
import { AttributeService } from '../attribute/attribute.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


const CAPABILITIES: ICapability[] = [
    { id: '11', attributeId: '1', componentId: '1', name: 'Capability A1 - C1', description: ''},
    { id: '12', attributeId: '1', componentId: '2', name: 'Capability A1 - C2', description: ''},
    { id: '13', attributeId: '1', componentId: '3', name: 'Capability A1 - C3', description: ''},
    { id: '21', attributeId: '2', componentId: '1', name: 'Capability A2 - C1', description: ''},
    { id: '22', attributeId: '2', componentId: '2', name: 'Capability A2 - C2', description: ''},
    { id: '24', attributeId: '2', componentId: '4', name: 'Capability A2 - C4', description: ''},
    { id: '25', attributeId: '2', componentId: '5', name: 'Capability A2 - C5', description: ''},
    { id: '26', attributeId: '2', componentId: '6', name: 'Capability A2 - C6', description: ''},
    { id: '33', attributeId: '2', componentId: '6', name: 'Capability 2 A2 - C6', description: ''},
    { id: '34', attributeId: '2', componentId: '6', name: 'Capability 3 A2 - C6', description: ''}
];

@Injectable()
export class CapabilityService {

    constructor (private componentService: ComponentService, private attributeService: AttributeService) { }

    getCapabilities(): Observable<ICapability[]> {

        const subject = new Subject<ICapability[]> ();
        setTimeout(() => {
            subject.next(CAPABILITIES);
            subject.complete();
        }, 1000);
        return subject;
    }

    // getCapabilityTable(): Observable<ICapabilityTable> {
    getCapabilityTable(): any {
      // const data: ICapabilityTable = {capabilities: CAPABILITIES, attributes: [], component: []};
      let table: CapabilityTable; // {capabilities: ICapability[], components: [], attributes: []};

      Observable.forkJoin(
        this.getCapabilities().map( (caps: ICapability[]) => caps ),
        this.componentService.getComponents().map( (comps: IComponent[]) => comps ),
        this.attributeService.getAttributes().map((attrs: IAttribute[]) => attrs)
      ).subscribe(
          // caps => {  table.capabilities = caps[0]; table.components = caps[1]; table.attributes = caps[2]; },
          caps => { table = new CapabilityTable(caps[2], caps[1], caps[0]); console.log('table:', table); },
            e => console.log('onError %s', e),
            () => { console.log('done'); }
      );

      return table;
    }

    // getCapabilityTable(): Observable<ICapabilityTable> {
    getCapabilityTableObs(): Observable<CapabilityTable> {
      // const data: ICapabilityTable = {capabilities: CAPABILITIES, attributes: [], component: []};
      // const table: CapabilityTable; // {capabilities: ICapability[], components: [], attributes: []};

      return Observable.forkJoin(
        this.getCapabilities().map((caps: ICapability[]) => caps ),
        this.componentService.getComponents().map((comps: IComponent[]) => comps ),
        this.attributeService.getAttributes().map((attrs: IAttribute[]) => attrs)
      ).map(res => new CapabilityTable(res[2], res[1], res[0]));
    }
}
