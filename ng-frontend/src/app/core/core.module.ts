import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemesListComponent } from './memes/memes-list/memes-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppMaterialModule } from '../modules/material-app.module';
import { RouterModule } from '@angular/router';
import { MemComponent } from './memes/mem/mem.component';
import { MemAddComponent } from './memes/mem/mem-add/mem-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MemesListComponent,
    NotFoundComponent,
    MemComponent,
    MemAddComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [
    MemesListComponent,
    NotFoundComponent
  ]
})
export class CoreModule {
}
