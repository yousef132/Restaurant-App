import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/IProduc';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,SpinnerComponent],
  providers: [ProductsService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  id:number =0;
  product!:IProduct;
  isLoading:boolean = false;
  constructor(private router:ActivatedRoute,private productsService:ProductsService){
    this.id = this.router.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(){
    this.isLoading = true;
    this.productsService.getProducttById(this.id).subscribe({
      next:(data:any)=>{
        this.product = data;
        this.isLoading = false;
        console.log(data);
      },
      error:(error)=>{
        alert('Error While Requesting Data');
        this.isLoading = false;
      }
    })
  }
}
