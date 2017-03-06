export interface ICapability {
    id: string;
    name: string;
    description?: string;
    component: IComponent;
    attribute: IAttribute;
    componentId: string;
    attributeId: string;
    frequencyId: string;
    impactId: string;
    test?: { externalId?: string, cases: number, executed: number, failed: number };
    defects?: {type1: number, type2: number, type3: number};
    code?: {loc: number, churn: number, coverage: number, quality: string };
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
