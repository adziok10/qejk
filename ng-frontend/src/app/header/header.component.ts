import {
    Component,
    OnInit
} from '@angular/core';
import {
    AuthService
} from '../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

    isLoggedIn = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private _location: Location) {
        authService.loggedIn.subscribe(x => this.isLoggedIn =  x);
    }

    ngOnInit() {}

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    backToPreviousPage() {
        this._location.back();
    }
}
