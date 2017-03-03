import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorService {
errorMessages: string[] = [];

    constructor (private router: Router) { }

    handleError (message: string, location = '') {
        this.errorMessages.push(`Error: ${message} in: ${location}`);
        this.router.navigate(['/error']);
    }

    clearErrors() {
        this.errorMessages = [];
    }
}
