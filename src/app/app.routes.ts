import { Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { HomeComponent } from './Home/home/home.component';

export const routes: Routes = [
  { path: "", component: HomeComponent }, // Default route for home
  { path: "products", component: AllProductsComponent },
  { path: "details/:id", component: ProductDetailsComponent },
  { path: "cart", component: CartComponent },
  { path: "**", redirectTo: "", pathMatch: "full" }, // Redirect to home
];
