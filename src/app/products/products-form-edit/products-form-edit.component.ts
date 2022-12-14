import { Products } from './../model/products';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/category/model/category';
import { Observable, of } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-products-form-edit',
  templateUrl: './products-form-edit.component.html',
  styleUrls: ['./products-form-edit.component.scss']
})
export class ProductsFormEditComponent {

  idProduct: number;

  categories$: Observable<Category[]>; //inicializando vazia

  form = this.formBuilder.group(
    {
        name: [""],
        price: [],
        //category: new FormControl('')
        category: []
    });

  constructor(private formBuilder: NonNullableFormBuilder,      //não permite valores null
              private serviceCategories: CategoriesService,
              private snackBar: MatSnackBar,
              private serviceProducts: ProductsService,
              private route: ActivatedRoute
  )
  {}

  ngOnInit(): void
  {
  this.route.params.pipe(
    map((params: any) => params['id']),
    switchMap((id: any) => this.serviceProducts.getById(id))
  )
    .subscribe(product => this.updateForm(product))

  this.onListCategory()
  }

  onListCategory()
  {
    this.categories$ = this.serviceCategories.list()
     .pipe(
       catchError(error => {
        console.log(error);
         //this.onError();
        return of([]) //serve para retornar algo e sair do loading spinner caso de algum erro, o of transforma o array vazio em um observable
      })
    )
  }

  updateForm(product: Products) {
    this.idProduct = product.id;
    this.form.patchValue({  //seta o valor do campo [""] => nome
      name: product.name,
      price: product.price,
      category: product.category
    })
  }

  onSubmitEdit()
  {
    this.serviceProducts.update(this.idProduct, this.form.value)
    .subscribe({
      next: () => {this.onSuccess()},
      error: () => {this.onError()}
    })
  }

  private onSuccess()
  {
    this.snackBar.open("produto editado", "", {duration: 3000})
  }

  private onError() {
    this.snackBar.open("erro ao editar produto", "", {duration: 3000})
  }
}
