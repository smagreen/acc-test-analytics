import '../shared/rxjs-extensions';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ICapability, IComponent, IAttribute, CapabilityMatrix, MatrixElement } from '../model/capability.model';
import { ComponentService } from '../component/component.service';
import { AttributeService } from '../attribute/attribute.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CapabilityService {

     private baseUrl = 'api/capabilities';

    constructor (private http: Http, private componentService: ComponentService,
                    private attributeService: AttributeService) { }

    getCapabilities(): Observable<ICapability[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getCapabilitiesByIntersection(attributeId: string, componentId: string): Observable<ICapability[]> {
        return this.http.get(this.baseUrl)
            .map( res => this.filterByAttrAndComp(this.extractData(res), attributeId, componentId))
            .catch(this.handleError);
    }

     getCapabilityData(): Observable<CapabilityMatrix> {

       return Observable.forkJoin(
            this.getCapabilities(),
            this.componentService.getComponents(),
            this.attributeService.getAttributes()
      ).map(res => this.resolveMatrix( res[2], res[1], res[0]));

    }

    getCapability(id: string): Observable<ICapability> {
        return this.http.get(this.baseUrl + '/' + id)
            .map(this.extractData)
            .do(data => console.log('getcapabilities: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveCapability(capability: ICapability): Observable<ICapability> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        if (capability.id.length === 0) {
            return this.createCapability(capability, options);
        }
        return this.updateCapability(capability, options);
    }

    private createCapability(capability: ICapability, options: RequestOptions): Observable<ICapability> {
        // capability.id = undefined;
        capability.id = 'all new';
        return this.http.post(this.baseUrl, capability, options)
            .map(this.extractData)
            .do(data => console.log('createCapability: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateCapability(capability: ICapability, options: RequestOptions): Observable<ICapability> {
        const url = `${this.baseUrl}/${capability.id}`;
        return this.http.put(url, capability, options)
            .map(() => capability)
            .do(data => console.log('updateCapability: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    // build the matrix - resolving attribute and component ids to the relevant objects
    // easier to do on the server - but this is a hack for now!
    private resolveMatrix(attrList: IAttribute[], componentList: IComponent[], capsList: ICapability[]): CapabilityMatrix {
        const matrix: CapabilityMatrix = { elements: [], attributes: attrList, components: componentList };

        capsList.forEach(c => {
            let element: MatrixElement = matrix.elements
                .find(e => (e.attribute.id === c.attribute.id && e.component.id === c.component.id));

            if (!element) {
                element = new MatrixElement(c.id,
                 componentList.find( co => co.id === c.component.id),
                 attrList.find( a => a.id === c.attribute.id), [c]);
                 matrix.elements.push(element);
            } else {
                element.capabilities.push(c);
            }
        });

        return matrix;
    }

    private filterByAttrAndComp(source: ICapability[], attributeId: string, componentId: string) {
        return source.filter(e => (e.attribute.id === attributeId && e.component.id === componentId));
    }

    private handleError(error: Response): Observable<any> {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private extractData(response: Response) {
        const body = response.json();
        return body.data || body || {};
    }

}
