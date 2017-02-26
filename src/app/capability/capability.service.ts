import '../rxjs-extensions';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ICapability, IComponent, IAttribute, CapabilityMatrix, MatrixElement } from '../model/capability.model';
import { ComponentService } from '../component/component.service';
import { AttributeService } from '../attribute/attribute.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CapabilityService {

     private baseUrl = 'api/capabilities';

    constructor (private http: Http, private componentService: ComponentService, private attributeService: AttributeService) { }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private extractData(response: Response) {
            let body = response.json();
            return body.data || {};
        }


    private getCapabilities(): Observable<ICapability[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
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
            .do(data => console.log('getProducts: ' + JSON.stringify(data)))
            .catch(this.handleError);
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
