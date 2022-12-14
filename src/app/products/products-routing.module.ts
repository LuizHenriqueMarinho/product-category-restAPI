import { CategoryListComponent } from './../category/category-list/category-list/category-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductsFormComponent } from './products-form/products-form.component';
import { ProductsFormEditComponent } from './products-form-edit/products-form-edit.component';
import { CategoryComponent } from '../category/category/category.component';
import { CategoryListEditComponent } from '../category/category-list-edit/category-list-edit/category-list-edit.component';

const routes: Routes = [
  {path: '', component: ProductsComponent },
  {path: 'new', component: ProductsFormComponent},
  {path: 'edit/:id', component: ProductsFormEditComponent},
  {path: 'categories', component: CategoryListComponent },
  {path: 'categories/editCategories/:id', component: CategoryListEditComponent}
  //{path: 'categories/list', component: CategoryListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
