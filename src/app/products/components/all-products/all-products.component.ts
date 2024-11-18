import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { SelectComponent } from '../../../shared/components/select/select.component';
import { ProductComponent } from '../product/product.component';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/IProduc';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, SpinnerComponent,SelectComponent,ProductComponent,RouterModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent implements OnInit {
  products: IProduct[]=[];
  categories: any;
  isLoading: boolean = false;
  cartProducts: any[] = [];
  constructor(private productsService: ProductsService) {}


  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.isLoading =  true;

    this.productsService.getAllProducts().subscribe({
      next: (data:any) => {
        console.log(data);
        console.log("----------------");
        this.products = data;
        this.isLoading = false;
      },
      error: (error) => {
        alert('Error While Requesting Data');
      },
    });
  }

  getCategories() {
    this.isLoading =  true;

    this.productsService.getAllCategories().subscribe({
      next: (data) => {
        console.log(data);
        this.categories = data;
        this.isLoading =  false;

      },
      error: (error) => {
        alert('Error While Requesting Data');
      },
    });
  }

  getProductsByCategory(category: any) {
    this.isLoading = true;
    this.productsService.filterByCategory(category.target.value).subscribe({
      next: (data:any) => {
        this.products = data;
        this.isLoading =  false;
      },
      error: (error) => {
        alert('Error While Requesting Data');
      },
    });
  }

  filter(category: any) {
    if (category.target.value === 'ALL') this.getProducts();
    else this.getProductsByCategory(category);
  }
  addToCart(product: any) {

    let storedCart = localStorage.getItem('cart');
console.log(product);

    if (storedCart) {
      try {
        this.cartProducts = JSON.parse(storedCart);

        if (!Array.isArray(this.cartProducts)) {
          console.error('Cart data in localStorage is not an array');
          this.cartProducts = [];
        }
      } catch (e) {
        console.error('Error parsing cart data from localStorage', e);
        this.cartProducts = [];
      }
    } else {
      this.cartProducts = [];
    }

    let exist = this.cartProducts.find(item => item.item.id === product.item.id);

    if (exist) {
      alert('Product is already in your cart');
    } else {
      this.cartProducts.push(product);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }

}
