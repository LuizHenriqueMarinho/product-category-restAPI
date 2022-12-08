import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common'
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/category/model/category';
import { Observable, of } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent {

  categories$: Observable<Category[]>; //inicializando vazia

  form: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder, //não permite valores null
    private service: ProductsService,
    private snackBar: MatSnackBar,
    private location: Location, //existem dois locations, tem que importar

    private serviceCategories: CategoriesService,
  )
  {}

  ngOnInit(): void
  {
    this.onListCategory();
    this.form = this.formBuilder.group(
      {
        name: ["", Validators.required],
        price: [],
        category: new FormControl('')
      }
    )

  }

  onSubmit()
  {
    this.service.save(this.form.value)
    .subscribe({
      next: () => {this.onSuccess()},
      error: () => {this.onError()}
    })
  }

  onCancel()
  {
    this.location.back();
  }

  private onSuccess()
  {
    this.snackBar.open("produto cadastrado", "", {duration: 3000})
    this.onCancel(); // para voltar para pagina inicial
  }

  private onError()
  {
    this.snackBar.open("erro ao cadastrar produto", "", {duration: 3000})
  }


  ////////////////////////
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
}
