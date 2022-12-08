import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ //o comando <router-outlet></router-outlet> no html chama o routes
  { path: '', pathMatch: 'full', redirectTo: 'products' }, //essa logíca faz p /products ser a página inicial,
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
