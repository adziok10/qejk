import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

    private loggedInSubject: BehaviorSubject<boolean>;
    public loggedIn: Observable<boolean>;

    constructor(private http: HttpClient) {
        this.loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
        this.loggedIn = this.loggedInSubject.asObservable();
    }

    login(login: string, password: string ): Observable<any> {
        const reqt = this.http.post<any>(environment.base_api_url + '/user/login', {login, password});
        reqt.subscribe(
            data => {
                console.log(data);
              this.setSession(data);
            }
        );
        this.loggedInSubject.next(true);
        return reqt;
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        this.loggedInSubject.next(false);
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    register(login: string, password: string, email: string): Observable<any>  {
        const reqt = this.http.post<any>(environment.base_api_url + '/user/register', {login, password, email});
        return reqt;
    }

}
