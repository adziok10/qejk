import {
    NgModule
} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import {
    LoginComponent
} from './user/login/login.component';
import {
    AuthGuardService
} from './services/auth-guard.service';
import {
    LoggedInGuardService
} from './services/logged-in-guard.service';
import {
    MemesListComponent
} from './core/memes/memes-list/memes-list.component';
import {
    RegisterComponent
} from './user/register/register.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { MemComponent } from './core/memes/mem/mem.component';
import { MemAddComponent } from './core/memes/mem/mem-add/mem-add.component';

const routes: Routes = [{
        path: 'login',
        component: LoginComponent,
        canActivate: [LoggedInGuardService]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LoggedInGuardService]
    },
    {
        path: '',
        component: MemesListComponent
    },
    {
        path: 'mem/add',
        component: MemAddComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'mem/:id',
        component: MemComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'disabled',
        anchorScrolling: 'enabled',
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
