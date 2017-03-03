import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from './error.service';

@Component({
  template: `
    <h1 class="errorMessage">Oops: {{error}}</h1>
    <div class="alert" *ngFor="let e of errors">{{e}}</div>
  `,
  styles: [`
    .errorMessage { 
      margin-top:150px; 
      font-size: 50px;
      text-align: center; 
    }`]
})
export class ErrorComponent implements OnInit {
  errors: string[];
  error: string;
  sub: any;
  constructor(private route: ActivatedRoute, private errorService: ErrorService) { }

   ngOnInit() {
        this.sub = this.route.params.subscribe( params => {
          this.error = params['message'];
          this.errors = this.errorService.errorMessages;
        });
   }
}
