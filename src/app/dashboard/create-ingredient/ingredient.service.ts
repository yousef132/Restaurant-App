import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from './Ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) {}

  private readonly apiUrl = 'https://localhost:7203/api/';


  createIngredient(ingredient:Ingredient) {
    return this.http.post(this.apiUrl+'Ingredients', ingredient);
  }

  getAllIngredients() {
    return this.http.get(this.apiUrl+'ingredients');
  }
}
