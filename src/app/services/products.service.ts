import { Products } from '../products/model/products';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly API = 'http://localhost:8080/products'; //http://localhost8080/pessoas

  constructor(private httpClient: HttpClient) { }

  list()
  {
    return this.httpClient.get<Products[]>(this.API) //isso é um tipo Observable, versão melhorada do primisses
    .pipe(   //permite manipular com rxjs
      first(),
      tap(products => console.log(products)) //recebe lista => faz o que quiser com ela
    );
  }

  listPage(page: number, size: number)
  {
    return this.httpClient.get<Products[]>(`${this.API}?page=${page}&size=${size}`)
  }

  save(record: Partial<Products>) //aceita que o objeto esteja faltando atributos
  {
    return this.httpClient.post<Products>(`${this.API}/save`, record)
  }

  remove(id: number)
  {
    return this.httpClient.delete<Products>(`${this.API}/${id}`)
  }

  update(id: number, record: Partial<Products>)
  {
    return this.httpClient.put<Products>(`${this.API}/${id}`, record)
  }

  getById(id: number)
  {
    return this.httpClient.get<Products>(`${this.API}/${id}`)
  }

  filter(product : string): Observable<Products[]> {
    return this.httpClient.get<Products[]>(`${this.API}/busca?name=${product}`);
  }

}
