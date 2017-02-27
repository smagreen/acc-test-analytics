export interface ICapability {
    id: string;
    name: string;
    description?: string;
    componentId: string;
    attributeId: string;
    frequencyId?: string;
    impactId?: string;
}

export interface IAttribute {
    id: string;
    name: string;
    description: string;
}

export interface IComponent {
    id: string;
    name: string;
    description: string;
}

export class MatrixElement implements IIntersection {
  constructor(public id: string, public component: IComponent, public attribute: IAttribute, public capabilities: ICapability[] ) {
  }
}

export interface CapabilityMatrix {
    attributes: IAttribute[];
    components: IComponent[];
    elements: MatrixElement[];
}

export interface IIntersection {
    id: string;
    component: IComponent;
    attribute: IAttribute;
    capabilities: ICapability[];
}