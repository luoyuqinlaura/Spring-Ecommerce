import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) {}

  // return an observable, map the JSON data from spring data rest to product array
  getProductList(theCategoryId: number): Observable<Product[]> {
    //@TODO: need to build url based on category id...
    return this.httpClient
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.products));
  }
}

// supporting interface to help with mapping 14 - 20
// unwrap the json from spring data rest _embedded entry
interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
