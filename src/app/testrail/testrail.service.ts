import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ITestSection, ITestCase } from '../model/capability.model';

@Injectable()
export class TestrailService {

    private baseUrl = 'api/testrail';
    private suiteId = 6236;

    constructor (private http: Http) { }
    // http://localhost:5000/api/testrail/suites/6236/sections
    getSections(): Observable<ITestSection[]> {
        const url = this.baseUrl + `/suites/${this.suiteId}/sections`;
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // http://localhost:5000/api/testrail/suites/6236/sections/254951
    getTestCaseForSection(sectionId: number): Observable<ITestCase[]> {
        const url = this.baseUrl + `/suites/${this.suiteId}/sections/${sectionId}`;

        return this.http.get(url )
            .map(this.extractData)
            .catch(this.handleError);
    }



     private handleError(error: Response): Observable<any> {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }

    private extractData(response: Response) {
        const body = response.json();
        return body.data || body || {};
    }

}