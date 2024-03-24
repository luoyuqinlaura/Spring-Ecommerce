import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  searchModule: boolean = false;
  //inject productservice
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      //这个方法是我们自己定义的，调用那边写好的service
      this.listProducts();
    });
  }
  listProducts() {
    this.searchModule = this.route.snapshot.paramMap.has('keyword');
    if (this.searchModule) {
      this.handleSearchListProducts();
    } else {
      this.handleListProducts();
    }
  }
  handleSearchListProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService
      .searchProduct(theKeyword)
      .subscribe((data) => (this.products = data));
  }
  handleListProducts() {
    //check if the id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the id string and convert to a number
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      //not category id exist, default as 1
      this.currentCategoryId = 1;
    }
    //now get the products for the specific category id
    // method is invoked once you subscribe,这是一个async方法，得到data就可以赋值到我们的products数组中
    this.productService
      .getProductList(this.currentCategoryId)
      .subscribe((data) => {
        this.products = data;
      });
  }
}
