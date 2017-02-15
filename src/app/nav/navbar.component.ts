import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {
isAuthenticated: Boolean = false;
    ngOnInit() {

    }
}
