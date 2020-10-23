import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductListService {
    
    private productList: Product[] = [

        new Product(0, 'Mobile Phone', 'Samsung S10', 'This is a Samsung Android Device for all galaxy lovers', 'assets/images/S10.jpg', 30000),
        new Product(1, 'Mobile Phone', 'Samsung S20', 'This is a Samsung latest Android Device with updated OS', 'assets/images/5.jpg', 45000),
        new Product(2, 'Television', 'Samsung LED TV', 'This is a Samsung Slim Samsung LED Televison to fullfill your home needs', 'assets/images/1.jpg', 40000),
        new Product(3, 'Television','Phillips LED TV', 'This is a Phillips LED Televison to fullfill your home needs', 'assets/images/2.jpeg', 36000),
        new Product(4, 'Mobile Phone', 'Realme 10', 'This is a latest Realme Android Device', 'assets/images/9.jpg',15000),
        new Product(5, 'Mobile Phone', 'OnePlus Nord', 'This is a OnePlus Latest Android Device Budget Edition', 'assets/images/6.jpeg', 35000)
    
    ];

    constructor() {}

    getProducts() {
        return this.productList.slice();
    }

    getProduct(id: number) {
        const prod = this.productList.find(
            (s) => {
                return s.id === id;
            }
        );
        return prod;
    }
}