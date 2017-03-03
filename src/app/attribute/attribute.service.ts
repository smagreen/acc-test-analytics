import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IAttribute } from '../model/capability.model';

@Injectable()
export class AttributeService {
 private baseUrl = 'api/attributes';

    constructor(private http: Http) { }

    getAttributes(): Observable<IAttribute[]> {
      return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private handleError(error: Response): Observable<any> {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }
}



