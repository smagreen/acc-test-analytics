import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { IComponent } from '../model/capability.model';

@Injectable()
export class ComponentService {
    private baseUrl = 'api/components';

    constructor(private http: Http) { }
    
    getComponents(): Observable<IComponent[]> {
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



