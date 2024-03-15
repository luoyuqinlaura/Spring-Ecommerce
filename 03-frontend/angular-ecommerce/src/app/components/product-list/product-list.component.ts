import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  //inject productservice
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    //这个方法是我们自己定义的，调用那边写好的service
    this.listProducts();
  }
  listProducts() {
    // method is invoked once you subscribe,这是一个async方法，得到data就可以赋值到我们的products数组中
    this.productService.getProductList().subscribe((data) => {
      this.products = data;
    });
  }
}
