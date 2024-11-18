import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IProduct } from '../../models/IProduc';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!:IProduct;
  @Output() event = new EventEmitter();
  addButton:boolean = false;
  quantity:any=0;
  add(){
    
    if(this.quantity == 0){
      alert("Please enter the quantity");
    }else{
      this.event.emit({item:this.product,quantity:this.quantity});
      this.quantity = "";
    }
  }
}
