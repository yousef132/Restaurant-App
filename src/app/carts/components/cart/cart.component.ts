import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductsService } from '../../../products/services/products.service';
import { CartsService } from '../../services/carts.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule,TranslateModule],
  providers: [ProductsService],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnChanges {
  products: any;
  totalAmount: number = 0;
  orderCreated: boolean = false;
  @Input() cartProducts: any = [];

  constructor(private cartsService: CartsService,public translate :TranslateService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cartProducts']) {
      this.calculateTotalAmount();
    }
  }

  ngOnInit(): void {}

  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
  }

  calculateTotalAmount(): void {
    this.totalAmount = 0;
    for (let x in this.cartProducts) {
      this.totalAmount +=
        this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  decreaseQuantity(index: any) {
    if (this.cartProducts[index].quantity == 1) {
      this.removeFromCart(index);
      return;
    } else {
      this.cartProducts[index].quantity--;
      this.calculateTotalAmount();
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }

  increaseQuantity(index: any) {
    this.cartProducts[index].quantity++;
    this.calculateTotalAmount();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  clearCart() {
    this.cartProducts = [];
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.calculateTotalAmount();
  }

  removeFromCart(index: any) {
    this.cartProducts.splice(index, 1);
    this.calculateTotalAmount();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  getProducts() {
    let products = [];
    for (let x in this.cartProducts) {
      products.push({
        productId: this.cartProducts[x].item.id,
        quantity: this.cartProducts[x].quantity,
      });
    }
    return products;
  }

  orderNow() {
    this.getCartProducts();

    const order = {
      products: this.getProducts(),
    };

    this.cartsService.createOrder(order).subscribe({
      next: (response: any) => {
        let fileName = 'invoice';
        let blob:Blob = response.body as Blob;
        let a = document.createElement('a');
        a.download= fileName;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      },
      error: (err) => {
        alert(err.error);
      },
    });

    this.clearCart();
    this.calculateTotalAmount();
  }
}
