import { Category } from './../category/model/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly API = 'http://localhost:8080/categories';

  constructor(private httpClient: HttpClient) { }

  list()
  {
    return this.httpClient.get<Category[]>(this.API) //isso é um tipo Observable, versão melhorada do primisses
    .pipe(   //permite manipular com rxjs
      first(),
      tap(category => console.log(category)) //recebe lista => faz o que quiser com ela
    );
  }

  save(record: Partial<Category>) //aceita que o objeto esteja faltando atributos
  {
    return this.httpClient.post<Category>(`${this.API}/save`, record);
  }

  remove(id: number)
  {
    return this.httpClient.delete<Category>(`${this.API}/delete/${id}`)
  }

  filter(category : string): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.API}/busca?name=${category}`);
  }
}
