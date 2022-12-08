import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from './../../model/category';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogConfirmationComponent } from 'src/app/dialog-confirmation/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {

  category$: Observable<Category[]>; //inicializando vazia
  displayedColumns = ["name", "actions"]

  constructor(
    private categoryService: CategoriesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,  //rota em que o usuário estver
    private snackBar: MatSnackBar,
    private dialogConfirmation: MatDialog,
    )
  {
    //this.products$ = this.productsCategoriesService.list()
  }

  ngOnInit(): void
  {
    this.onList();
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onList()
  {
    this.category$ = this.categoryService.list()
     .pipe(
       catchError(error => {
        console.log(error);
         this.onError('erro ao carregar categorias.');
        return of([]) //serve para retornar algo e sair do loading spinner caso de algum erro, o of transforma o array vazio em um observable
      })
    )
  }

  onAdd() {
    console.log("onAdd");
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  onListCategory()
  {
    this.onList()
  }


  onRemove(id: number)
  {
    const dialogStatus = this.dialogConfirmation.open(DialogConfirmationComponent);
    dialogStatus.afterClosed().subscribe(anser =>
      {
        if(anser)
        {
         this.categoryService.remove(id)
          .subscribe({  //o subscribe avisa quando houver mudança no observable e retorna next ou error
          next: () => { this.snackBar.open("categoria removida", "", {duration: 3000}),  this.onList()},
          error: () => {this.snackBar.open("erro ao remover categoria", "", {duration: 3000})}
           })
        }
      })
  }

  onUpdate(id: number)
  {
    this.router.navigate(['edit', id], {relativeTo: this.route})
  }


  onAddCategory()
  {
    this.router.navigate(['categories'], {relativeTo: this.route})
  }
}
