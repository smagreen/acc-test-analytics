import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ICapability } from '../model/capability.model';


export class CapabilityData implements InMemoryDbService {

    createDb(){
        let capabilities: ICapability[] = [ 
            { id: '01', attributeId: '1', componentId: '1', name: 'Capability A1 - C1', description: 'This is the description for Capability id:11'},
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

        let ooks: any = [
            {id:1, value:'something'}
        ];

        return { capabilities, ooks };
    }
}