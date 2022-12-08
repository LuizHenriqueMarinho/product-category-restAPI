import { ProductsService } from 'src/app/services/products.service';
import { Component } from '@angular/core';
import { Products } from '../model/products';
import { Observable, of } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/category/model/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products$: Observable<Products[]>; //inicializando vazia
  displayedColumns = ["name", "price", "category", "actions"]

  categories$: Observable<Category[]>; //inicializando vazia

  formGroupPesquisaProduct: FormGroup
  formGroupPesquisaCategory: FormGroup

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,  //rota em que o usuário estver
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private serviceCategories: CategoriesService,
  ) {
    //this.products$ = this.productsCategoriesService.list()
  }

  ngOnInit(): void {
    this.formGroupPesquisaProduct = this.formBuilder.group({
      name: ""
    });

    this.formGroupPesquisaCategory = this.formBuilder.group({
      name: ""
    });

    //this.onList();
    this.onListPage(0, 10);
    this.onListCategory()
  }

  limparPesquisaProduct() {
    this.formGroupPesquisaProduct.reset();
    this.onList();
  }

  limparPesquisaCategory() {
    this.formGroupPesquisaCategory.reset();
    this.onList();
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onList() {
    // if(this.formGroupPesquisa.value.name)
    // {
    //   console.log(this.formGroupPesquisa.value.name)
    // //   this.products$ = this.products$.filter((product: any) => {
    // //     const verificando = product.name.toLowerCase().includes(this.formGroupPesquisa.value.name)
    // //     console.log("verificando" + verificando)
    // //     return verificando
    // //   }).list()

    // }
    // else
    // {
    this.products$ = this.productsService.list()
      .pipe(
        catchError(error => {
          console.log(error);
          this.onError('erro ao carregar produtos.');
          return of([]) //serve para retornar algo e sair do loading spinner caso de algum erro, o of transforma o array vazio em um observable
        })
      )
    //}
  }

  onListPage(page:number, size:number)
  {
    const objPage = this.productsService.listPage(page, size).subscribe(res => {
      //const teste = res.content
    })
    console.log("objPAge" + objPage)
    //this.products$
  }


  onListCategory() {
    this.categories$ = this.serviceCategories.list()
      .pipe(
        catchError(error => {
          console.log(error);
          //this.onError();
          return of([]) //serve para retornar algo e sair do loading spinner caso de algum erro, o of transforma o array vazio em um observable
        })
      )
  }

  onSearchProduct() {
    console.log(this.formGroupPesquisaProduct.value.name)
    this.products$ = this.productsService.filter(`${this.formGroupPesquisaProduct.value.name}`)//.subscribe(res => {
    // this.prod = res;
    //})
  }

  onSearchCategory() {
    console.log(this.formGroupPesquisaCategory.value.name.name)
    this.categories$ = this.serviceCategories.filter(`${this.formGroupPesquisaCategory.value.name.name}`)//.subscribe(res => {
  }

  onAdd() {
    console.log("onAdd");
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  onRemove(id: number) {
    console.log(id)
    this.productsService.remove(id)
      .subscribe({  //o subscribe avisa quando houver mudança no observable e retorna next ou error
        next: () => { this.snackBar.open("produto removido", "", { duration: 3000 }), this.onList() },
        error: () => { this.snackBar.open("erro ao remover produto", "", { duration: 3000 }) }
      })
  }

  onUpdate(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route })
  }


  onAddCategory() {
    this.router.navigate(['categories'], { relativeTo: this.route })
  }
}
