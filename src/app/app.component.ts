import { Component } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './nav/navbar.component';

@Component({
  selector: 'app-root',
  template: '<app-nav-bar></app-nav-bar><div id="content"><router-outlet></router-outlet></div>'
})
export class AppComponent {
  title: String = 'app works!';
}
