import { Component } from '@angular/core';
import { Location } from '@angular/common'
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/category/model/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-category-list-edit',
  templateUrl: './category-list-edit.component.html',
  styleUrls: ['./category-list-edit.component.scss']
})
export class CategoryListEditComponent {

  idCategory: number;

  form = this.formBuilder.group(
    {
        name: ["", [Validators.required]],
    });

  constructor(private formBuilder: NonNullableFormBuilder,
              private location: Location,
              private route: ActivatedRoute,
              private categoryService: CategoriesService,
              private snackBar: MatSnackBar)
  {}

  ngOnInit(): void
  {
  this.route.params.pipe(
    map((params: any) => params['id']),
    switchMap((id: any) => this.categoryService.getById(id))
  )
    .subscribe(product => this.updateForm(product))
  }

  onCancel()
  {
    this.location.back();
  }

  updateForm(category: Category) {
    this.idCategory = category.id;
    this.form.patchValue({  //seta o valor do campo [""] => nome
      name: category.name,
    })
  }

  onSubmitEdit()
  {
    this.categoryService.update(this.idCategory, this.form.value)
    .subscribe({
      next: () => {this.onSuccess()},
      error: () => {this.onError()}
    })
    this.onCancel()
  }

  private onSuccess()
  {
    this.snackBar.open("categoria editada", "", {duration: 3000})
  }

  private onError() {
    this.snackBar.open("erro ao editar categoria", "", {duration: 3000})
  }

}
