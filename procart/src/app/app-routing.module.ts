import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/auth.gaurd';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data:{title: 'HomePage'} },
  { path: 'signup', component: SignupComponent, data:{title: 'User Signup'} },
  { path: 'login', component: LoginComponent, data:{title: 'User Login'} },
  { path: 'products', component: ProductListComponent, data:{title: 'Product Listing'}
    // children:[
    //   { path: ':id', component: ProductDetailsComponent }
    // ] 
  },
  { path: 'products/:id', component: ProductDetailsComponent, data:{title: 'Product Details'} },
  { path: 'aboutus', component: AboutusComponent, data:{title: 'About Us'} },  
  { path: 'usercart', component: CartComponent, canActivate:[AuthGuard], data:{title: 'User Cart'} },  
  
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
