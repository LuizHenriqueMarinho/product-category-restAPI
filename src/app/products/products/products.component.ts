import { ProductsService } from 'src/app/services/products.service';
import { Component, ViewChild} from '@angular/core';
import { Products } from '../model/products';
import { Page } from '../model/page';
import { PageParams } from '../model/page-params';
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
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products',      //tag html
  templateUrl: './products.component.html',  //caminho do html
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  prod: Array<Products>
  teste: Array<Products>
  cat: Category[]
  catSearch : Category[]
  pageInfo: Page<any>

  page = 1;
  pageSize = 10;
  totalPages: number
  pageSizeOptions = [1, 2, 3, 4, 5, 10];

  // @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  products$: Observable<Products[]>; //inicializando vazia
  displayedColumns = ["name", "price", "category", "actions"]

  //categories$: Observable<Category[]>; //inicializando vazia

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
    // this.paginator._intl.itemsPerPageLabel = "Itens por página: "

    this.formGroupPesquisaProduct = this.formBuilder.group({
      name: ""
    });

    this.formGroupPesquisaCategory = this.formBuilder.group({
      name: ""
    });

    //this.onList();
    this.onListPage();
    this.onListCategory()
  }

  limparPesquisaProduct() {
    this.formGroupPesquisaProduct.reset();
    this.onListPage();
    this.pageSize = 4;
    console.log("limpar")
  }

  limparPesquisaCategory() {
    this.formGroupPesquisaCategory.reset();
    this.onListPage();
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  // onList() {
  //   // if(this.formGroupPesquisa.value.name)
  //   // {
  //   //   console.log(this.formGroupPesquisa.value.name)
  //   // //   this.products$ = this.products$.filter((product: any) => {
  //   // //     const verificando = product.name.toLowerCase().includes(this.formGroupPesquisa.value.name)
  //   // //     console.log("verificando" + verificando)
  //   // //     return verificando
  //   // //   }).list()

  //   // }
  //   // else
  //   // {
  //   this.products$ = this.productsService.list()
  //     .pipe(
  //       catchError(error => {
  //         console.log(error);
  //         this.onError('erro ao carregar produtos.');
  //         return of([]) //serve para retornar algo e sair do loading spinner caso de algum erro, o of transforma o array vazio em um observable
  //       })
  //     )
  //   //}
  // }

  onListPage()
  {
      let page: PageParams = { page: this.page - 1, linesPerPage: this.pageSize, oerderBy: 'id', direction: 'DESC'};
      this.productsService.listPage(page).subscribe(res => {
        if(res.content)
        this.prod = res.content
        this.totalPages =  res.totalPages
      })
  }


  onListCategory() {
    this.serviceCategories.list().pipe(
      catchError(error => {
        console.log(error);
        //this.onError();
        return of([]) //serve para retornar algo e sair do loading spinner caso de algum erro, o of transforma o array vazio em um observable
      })
    ).subscribe(res => {
      this.cat = res
    })
  }

  onSearchProduct() {
    console.log(this.formGroupPesquisaProduct.value.name)
    this.productsService.filter(`${this.formGroupPesquisaProduct.value.name}`).subscribe(res => {
    this.prod = res;
    })
  }

  onSearchCategory() {
      // this.serviceCategories.filter(this.formGroupPesquisaCategory.value.name.name)
      // .subscribe(res => {
      //   this.cat = res
      // })
      let page: PageParams = { page: this.page - 1, linesPerPage: this.pageSize, oerderBy: 'id', direction: 'DESC'};
      this.productsService.listPage(page).subscribe(res => {
        this.prod = []
        for(let i = 0; i < res.content.length; i++)
        {
          if(this.formGroupPesquisaCategory.value.name.name === res.content[i].category.name)
          {
             this.prod = [...this.prod, res.content[i]]
          }
        }
        this.totalPages =  res.totalPages
        })
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  onRemove(id: number) {
    console.log(id)
    this.productsService.remove(id)
      .subscribe({  //o subscribe avisa quando houver mudança no observable e retorna next ou error
        next: () => { this.snackBar.open("produto removido", "", { duration: 3000 }), this.onListPage() },
        error: () => { this.snackBar.open("erro ao remover produto", "", { duration: 3000 }) }
      })
  }

  onUpdate(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route })
  }


  onAddCategory() {
    this.router.navigate(['categories'], { relativeTo: this.route })
  }

  nextPage(event: PageEvent) {
    console.log(event)
    let page: PageParams = { page: event.pageIndex, linesPerPage: event.pageSize, oerderBy: 'createdAt', direction: 'DESC'};
    this.productsService.listPage(page).subscribe(res => {
      this.totalPages =  res.totalPages
      this.prod = res.content;
    })

  }
}
