import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <h1 class="errorMessage">Oops: {{error}}</h1>
  `,
  styles: [`
    .errorMessage { 
      margin-top:150px; 
      font-size: 50px;
      text-align: center; 
    }`]
})
export class Error404Component implements OnInit {
  error: String;
  sub: any;
  constructor(private route: ActivatedRoute) { }

   ngOnInit() {
        this.sub = this.route.params.subscribe( params => {
          this.error = params['message'];
        });
   }
}
