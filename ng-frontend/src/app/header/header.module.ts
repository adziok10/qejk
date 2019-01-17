import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from '../modules/material-app.module';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        AppMaterialModule
    ],
    exports: [
        HeaderComponent,
    ]
})
export class HeaderModule { }
