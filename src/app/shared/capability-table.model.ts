import { IAttribute } from './attribute.model';
import { IComponent } from './component.model';
import { ICapability } from './capability.model';

export class CapabilityTable {
    attributes?: IAttribute[];
    components?: IComponent[];
    capabilities?: ICapability[];

    constructor(attributes: IAttribute[], components: IComponent[], capabilities: ICapability[]) {
        this.attributes = attributes;
        this.components = components;
        this.capabilities = capabilities;
    }
}
