import { Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateProductComponent } from './dashboard/create-product/create-product.component';
import { CreateIngredientComponent } from './dashboard/create-ingredient/create-ingredient.component';

export const routes: Routes = [
  {
    path: "dashboard", component: DashboardComponent, children: [
      { path: "create-product", component: CreateProductComponent },
      { path: "create-ingredient", component: CreateIngredientComponent },
    ]
  },
  { path: "", component: AllProductsComponent },
  { path: "cart", component: CartComponent },
  { path: "details/:id", component: ProductDetailsComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];
