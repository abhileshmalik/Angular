import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../login/auth.service';
import { Product } from '../product-list/product.model';
import { ProductListService } from '../product-list/productlist.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  isAuthenticated = false;
  error: string = null;
  private userSub: Subscription;
  quantity: number;
  totalAmount: number;


  constructor(private productService: ProductListService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) { }


  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.product = this.productService.getProduct(id);
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });

  }
  
  onHandleError() {
    this.error = null;
  }

  placeOrder() {
    if(this.isAuthenticated){
      alert("Your Order is Successfully Placed");
      this.router.navigate(['/products']);
    } else {
      this.error = "Please Login to Proceed";
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
