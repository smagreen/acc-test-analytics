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
    testSection?: ITestSection;
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
    testSuiteId?: number;
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

export interface ITestResult {
   id: number;
   lastRun?: Date;
   result?: string;
}

export interface ITestCase {
    id: number;
    title: string;
    results?: ITestResult[];
}

export interface ITestSection {
    id: number;
    name: string;
    description: string;
    display_order?: number;
    depth?: number;
    testCases?: ITestCase[];
}


