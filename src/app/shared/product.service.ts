import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/*
const headers = new HttpHeaders();
headers.append('Content-Type', 'multipart/form-data');
headers.append('Accept', 'application/json');
*/
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpOptions = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  storeProduct(product: Product): Observable<any> {
    return this.http.post<Product>('http://localhost/api/products', product, this.httpOptions)
      .pipe(
        catchError(this.handleError<Product>('Store Product'))
      );
  }
  showProduct(id): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost/api/products/' + id)
      .pipe(
        tap(_ => console.log(`Product fetched: ${id}`)),
        catchError(this.handleError<Product[]>(`Show Product id=${id}`))
      );
  }
  indexProduct(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost/api/products')
      .pipe(
        tap(products => console.log('Product list fetched')),
        catchError(this.handleError<Product[]>('Get Product list', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
