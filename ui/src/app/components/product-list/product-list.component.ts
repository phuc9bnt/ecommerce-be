import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ProductService,
  ProductResponse,
} from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  productMessage = '';
  isLoading = false;
  errorMessage = '';

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProduct().subscribe({
      next: (response: ProductResponse) => {
        this.productMessage = response.message;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err.status === 0
            ? 'Unable to connect to the server. Make sure the backend is running.'
            : `Failed to load products: ${err.message}`;
      },
    });
  }
}
