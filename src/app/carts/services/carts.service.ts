import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartsService {

  API_URL = 'https://localhost:7203/api/Order';
  constructor(private client:HttpClient) {

   }

   createOrder(order:any){
    return this.client.post(this.API_URL,order,{responseType:'blob' ,observe:'response'});;
   }
}
