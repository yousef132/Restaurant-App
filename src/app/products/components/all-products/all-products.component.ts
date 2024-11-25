import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { ProductComponent } from '../product/product.component';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/IProduc';
import { FormsModule } from '@angular/forms';
import { CartComponent } from "../../../carts/components/cart/cart.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from '../../../shared/components/Footer/footer/footer.component';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    SelectComponent,
    ProductComponent,
    RouterModule,
    FormsModule,
    CartComponent,
    TranslateModule,
    HeaderComponent,
    FooterComponent
],
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  products: IProduct[] = [];
  categories: any;
  isLoading: boolean = false;
  cartProducts: any[] = [];
  totalAmount: number = 0;
  selectedProduct: any;
  selectedQuantity: number = 1;
  showModal: boolean = false;
  constructor(private productsService: ProductsService,public translate : TranslateService) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getCartProducts();

    console.log()

  }

  getProducts() {
    this.isLoading = true;

    this.productsService.getAllProducts().subscribe({
      next: (data: any) => {
        console.log(data);
        console.log("all products")
        this.products = data;
        this.isLoading = false;
      },
      error: (error) => {
        alert('Error While Requesting Data');
      },
    });
  }

  getCategories() {
    this.isLoading = true;

    this.productsService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (error) => {
        alert('Error While Requesting Data');
      },
    });
  }

  getProductsByCategory(category: any) {
    this.isLoading = true;
    this.productsService.filterByCategory(category).subscribe({
      next: (data: any) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (error) => {
        alert('Error While Requesting Data');
      },
    });
  }

  filter(category: any) {
    if (category === 'ALL') {
      this.getProducts();
    } else {
      this.getProductsByCategory(category);
    }
  }

  openProductModal(id: any) {
    let found = false;
    this.getCartProducts();

    // first check it it is in cart
    this.cartProducts.forEach((element) => {
      if (element.item.id == id) {
        this.selectedProduct = {
          item: element.item,
          quantity: element.quantity,
        };
        found = true;
      }
    });
    // get it from all products
    if (!found) {
      this.products.forEach((element) => {
        if (element.id == id) {
          this.selectedProduct = { item: element, quantity: 0 };
        }
      });
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedProduct = null;
  }

  addToCart(product: IProduct | null) {
    if (product) {
      // Check if product is already in the cart
      let exist = this.cartProducts.find((item) => item.item.id === product.id);

      if (exist) {
        alert('Product is already in your cart');
      } else {
        this.cartProducts.push({
          item: product,
          quantity: this.selectedQuantity,
        });
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
        alert('Product added to cart');
      }
      this.calculateTotalAmount();
    }
  }

  calculateTotalAmount(): void {
    this.totalAmount = 0;
    for (let x in this.cartProducts) {
      this.totalAmount +=
        this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
  }

  removeFromCart(id: any) {
    this.cartProducts = this.cartProducts.filter((ele) => ele.item.id !== id);
    this.calculateTotalAmount();
  }

  decreaseQuantity(id: any) {
    this.cartProducts.forEach((element) => {
      if (element.item.id == id) {
        if (element.quantity == 1) {
          this.removeFromCart(element.item.id);
          this.selectedProduct.quantity = 0;
        } else {
          element.quantity--;
          this.selectedProduct.quantity--;
        }
      }
    });
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.calculateTotalAmount();
  }

  increaseQuantity(id: any) {
    let found = false;
    this.cartProducts.forEach((element) => {
      if (element.item.id == id) {
        element.quantity++;
        found = true;
        this.selectedProduct.quantity++;
      }
    });
    if (!found) {
      this.products.forEach((element) => {
        if (element.id == id) {
          this.cartProducts.push({
            item: element,
            quantity: 1,
          });
          this.selectedProduct.quantity = 1;
        }
      });
    }
    this.cartProducts = [...this.cartProducts];
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.calculateTotalAmount();
  }

  clearCart() {
    this.cartProducts = [];
    this.calculateTotalAmount();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  updateQuantity(id: any, amount: any) {
    if (parseInt(amount) < 0) {
      alert('Quantity cannot be less than  0');
      return;
    }
    this.cartProducts.forEach((element) => {
      if (element.item.id == id) {
        element.quantity = amount;
      }
    });

    this.calculateTotalAmount();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
}
