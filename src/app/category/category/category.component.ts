import { CategoriesService } from './../../services/categories.service';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common'
import { FormControl, FormGroup } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  @Output() newList: EventEmitter<any> = new EventEmitter();  //para cominicar entre components
  // form = this.formBuilder.group(
  //   {
  //     name:[""]
  //   }
  // )

  formCategory: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder, //não permite valores null
    private service: CategoriesService,
    private snackBar: MatSnackBar,
    private location: Location, //existem dois locations, tem que importar
    //private listCategory: CategoryListComponent
  )
  {}

  ngOnInit(): void
  {
      this.formCategory = new FormGroup({
        id: new FormControl(),
        name: new FormControl('', [])
    })
  }

  onSubmit()
  {
    this.service.save(this.formCategory.value)
    .subscribe({
      next: () => {this.onSuccess()},
      error: () => {this.onError()}
    })

    this.newList.emit()
  }

  onCancel()
  {
    this.location.back();
  }

  private onSuccess()
  {
    this.snackBar.open("categoria cadastrada", "", {duration: 3000})
    //this.onCancel(); // para atualizar a page
    //this.listCategory.onList()
  }

  private onError()
  {
    this.snackBar.open("erro ao cadastrar categoria", "", {duration: 3000})
  }

}
