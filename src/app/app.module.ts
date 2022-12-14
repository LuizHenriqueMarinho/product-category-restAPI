import { MatPaginatorIntlPtBr } from './_util/paginator-prbr-i8n';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryComponent } from './category/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CategoryListComponent } from './category/category-list/category-list/category-list.component';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation/dialog-confirmation.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CategoryListEditComponent } from './category/category-list-edit/category-list-edit/category-list-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    CategoryListComponent,
    DialogConfirmationComponent,
    CategoryListEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtBr}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
