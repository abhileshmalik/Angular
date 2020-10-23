import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product-list/product.model';
import { ProductListService } from '../product-list/productlist.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() product: Product;

  constructor(private productService: ProductListService) { }

  ngOnInit(): void {
  }

}
