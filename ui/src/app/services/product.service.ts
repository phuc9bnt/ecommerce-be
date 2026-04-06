import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ProductResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  getProduct(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(
      `${environment.apiBaseUrl}/Product/Product`
    );
  }
}
