import {
    BrowserModule
} from '@angular/platform-browser';
import {
    NgModule
} from '@angular/core';
import {
    RouterModule, Router
} from '@angular/router';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import {
    HttpClientModule,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
    BrowserAnimationsModule,
    NoopAnimationsModule
} from '@angular/platform-browser/animations';

import {
    AppRoutingModule
} from './app-routing.module';
import {
    AppComponent
} from './app.component';
import {
    RegisterComponent
} from './user/register/register.component';
import {
    LoginComponent
} from './user/login/login.component';
import {
    AuthInterceptor
} from './interceptors/auth.interceptor';
import {
    AuthService
} from './services/auth.service';
import {
    AppMaterialModule
} from './modules/material-app.module';
import {
    HeaderModule
} from './header/header.module';
import {
    SnackbarService
} from './services/snackbar.service';
import {
    CoreModule
} from './core/core.module';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule,
        HeaderModule,
        RouterModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        CoreModule
    ],
    providers: [{
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        AuthService,
        SnackbarService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
