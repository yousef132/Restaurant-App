import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly productsUrl = 'https://localhost:7203/api/Products';
  private readonly categoriesUrl =
    'https://localhost:7203/api/Products/categories';
  private readonly filterWithCategoryUrl =
    'https://localhost:7203/api/Products/category/';

  private getHeaders(): HttpHeaders {
    const language = localStorage.getItem('lang') || 'en'; // Default to 'en' if not set
    const acceptLanguage = language === 'en' ? 'en-US' : 'ar-EG';
    return new HttpHeaders({
      'Accept-Language': acceptLanguage,
    });
  }
getEnglishHeader(){
return  new HttpHeaders({
    'Accept-Language': 'en-US',
  });
}
  constructor(private http: HttpClient) {}

  getAllProducts() {
    console.log(this.getHeaders());
    return this.http.get(this.productsUrl ,{headers:this.getHeaders()});
  }
  getAllCategories() {
    console.log(this.getHeaders());

    return this.http.get(this.categoriesUrl,{headers:this.getHeaders()});
  }
  filterByCategory(category: Number) {
    console.log(this.getHeaders());

    return this.http.get(
      this.filterWithCategoryUrl + category ,{headers:this.getHeaders()}
    );
  }
  getProducttById(id: any) {
    console.log(this.getHeaders());

    return this.http.get(this.productsUrl + '/' + id ,{headers:this.getHeaders()});
  }

  createProdcut(product: any) {
    console.log(this.getHeaders());
    console.log(product);
    return this.http.post(this.productsUrl, product,{headers:this.getHeaders()});
  }
}
