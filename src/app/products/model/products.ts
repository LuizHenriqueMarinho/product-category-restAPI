import { Category } from "../../category/model/category";

// export interface Products {

//   id: number;
//   name: string;
//   price: number;
//   category: Category;
// }

export interface MyObject {
  content: Array<Products>;
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export interface Products {
  id: number;
  name: string;
  price: number;
  category: Category;
};

export interface Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
  paged: boolean;
};

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};


