import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ICapability, IAttribute, IComponent } from '../model/capability.model';


export class CapabilityData implements InMemoryDbService {

    createDb(){
        const capabilities: ICapability[] = [
            { id: '01',  name: 'Capability A1 - C1', description: 'This is the description for Capability id:11',
                attribute: { id: '1', name: 'Attribute 1', description: 'Description 1'},
                component: { id: '1', name: 'Component 1', description: 'Description 1'},
                 risk: {frequencyId: 'D', impactId: '1' },
                 test: {cases: 120, executed: 56, failed: 12},
                 defects: {type1: 1, type2: 2, type3: 12 },
                 code: {loc: 100000, churn: 12000, coverage: 34.5, quality: 'A'}
            }
            // { id: '11', attributeId: '1', componentId: '1', name: 'Capability A1 - C1', description: 'This is the description for Capability id:11'},
            // { id: '112', attributeId: '1', componentId: '1', name: 'Capability 2 A1 - C1', description: ''},
            // { id: '12', attributeId: '1', componentId: '2', name: 'Capability A1 - C2', description: ''},
            // { id: '13', attributeId: '1', componentId: '3', name: 'Capability A1 - C3', description: ''},
            // { id: '21', attributeId: '2', componentId: '1', name: 'Capability A2 - C1', description: ''},
            // { id: '22', attributeId: '2', componentId: '2', name: 'Capability A2 - C2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.'},
            // { id: '24', attributeId: '2', componentId: '4', name: 'Capability A2 - C4', description: ''},
            // { id: '64', attributeId: '6', componentId: '4', name: 'Capability A6 - C4', description: ''},
            // { id: '65', attributeId: '6', componentId: '4', name: 'Capability A6 - C4', description: ''},
            // { id: '25', attributeId: '2', componentId: '5', name: 'Capability A2 - C5', description: ''},
            // { id: '26', attributeId: '2', componentId: '6', name: 'Capability A2 - C6', description: ''},
            // { id: '33', attributeId: '2', componentId: '6', name: 'Capability 2 A2 - C6', description: ''},
            // { id: '34', attributeId: '2', componentId: '6', name: 'Capability 3 A2 - C6', description: ''},
            // { id: '35', attributeId: '2', componentId: '6', name: 'Capability 4 A2 - C6', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.'},
            // { id: '36', attributeId: '2', componentId: '6', name: 'Capability 5 A2 - C6', description: ''},
            // { id: '37', attributeId: '2', componentId: '6', name: 'Capability 6 A2 - C6', description: ''},
            // { id: '38', attributeId: '2', componentId: '6', name: 'Capability 7 A2 - C6', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.'}
        ];

        let attributes: IAttribute[] = [
            { id: '1', name: 'Attribute 1', description: 'Description 1'},
            { id: '2', name: 'Attribute 2', description: 'Description 2'},
            { id: '3', name: 'Attribute 3', description: 'Description 3'},
            { id: '4', name: 'Attribute 4', description: 'Description 4'},
            { id: '5', name: 'Attribute 5', description: 'Description 6'},
            { id: '6', name: 'Attribute 6', description: 'Description 6'},
        ];

        let components: IComponent[] = [
            { id: '1', name: 'Component 1', description: 'Description 1'},
            { id: '2', name: 'Component 2', description: 'Description 2'},
            { id: '3', name: 'Component 3', description: 'Description 3'},
            { id: '4', name: 'Component 4', description: 'Description 4'},
            { id: '5', name: 'Component 5', description: 'Description 6'},
            { id: '6', name: 'Component 6', description: 'Description 6'},
            { id: '7', name: 'Component 7', description: 'Description 7'}
        ];

        return { capabilities, attributes, components };
    }
}