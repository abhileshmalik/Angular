import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductListService } from './productlist.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Product[];
  prodDetailToggler = false;

  constructor(private productservice: ProductListService) { }

  ngOnInit() {
    this.productList = this.productservice.getProducts();
    //console.log(this.productList);
  }

}
