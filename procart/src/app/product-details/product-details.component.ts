import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import { AuthService } from '../login/auth.service';
import { Product } from '../product-list/product.model';
import { ProductListService } from '../product-list/productlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  isAuthenticated = false;
  error: string = null;
  private userSub: Subscription;

  constructor(private productService: ProductListService,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.product = this.productService.getProduct(id);
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  addToWishlist() {
    if(this.isAuthenticated){
      alert("Your Product is added to Wishlist");
    } else {
      this.error = "Please Login to Proceed";
    }
  }

  addToCart() {
    if(this.isAuthenticated){
      alert("Product Added");
    } else {
      this.error = "Please Login to Proceed";
    }
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
