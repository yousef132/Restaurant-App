import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../products/services/products.service';
import { Ingredient } from '../create-ingredient/Ingredient';
import { IngredientService } from '../create-ingredient/ingredient.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent implements OnInit {
  private fb: FormBuilder = new FormBuilder();

  constructor(
    private productService: ProductsService,
    private ingredientService: IngredientService
  ) {}
  ingredients!: Ingredient[];
  categories!: any[];

  CreateForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    categoryId: [null, [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
    profit: [0, [Validators.required, Validators.min(0)]],
    image: [null, Validators.required],
    ingredients: this.fb.array([this.addIngredientFormGroup()]),
    release: [false],
  });

  prepareFormData(): FormData {
    const formData = new FormData();

    // Append simple form controls
    formData.append('name', String(this.CreateForm.get('name')?.value));
    formData.append(
      'description',
      String(this.CreateForm.get('description')?.value)
    );
    formData.append(
      'categoryId',
      String(this.CreateForm.get('categoryId')?.value)
    );
    formData.append('price', String(this.CreateForm.get('price')?.value));
    formData.append('profit', String(this.CreateForm.get('profit')?.value));
    formData.append('release', String(this.CreateForm.get('release')?.value));

    // Append the image file
    const imageFile = this.CreateForm.get('image')?.value;
    if (imageFile) {
      formData.append('image', imageFile);
    }
    // Append ingredients as nested array
    const ingredients = this.CreateForm.get('ingredients')?.value || [];
    for(let i = 0; i < ingredients.length; i++) {
      ingredients[i]['ingredientId'] = Number(ingredients[i]['ingredientId']);
    }

    formData.append('Ingredients',JSON.stringify(ingredients))
    return formData;
  }


  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.CreateForm.patchValue({ image: file });
    }
  }
  ngOnInit(): void {
    this.getAllIngredients();
    this.getAllCategories();
  }

  getAllIngredients() {
    this.ingredientService.getAllIngredients().subscribe({
      next: (data: any) => {
        this.ingredients = data;
        console.log(this.ingredients);
      },
      error: () => alert('Error fetching ingredients'),
    });
  }

  getAllCategories() {
    this.productService.getAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: () => alert('Error fetching categories'),
    });
  }
  addSkillButtonClick(): void {
    (<FormArray>this.CreateForm.get('ingredients'))?.push(
      this.addIngredientFormGroup()
    );
  }
  addIngredient() {
    this.updatePrice();
    // this.createNewIngredient();
  }

  createNewIngredient() {
    const ingredientGroup = new FormGroup({
      ingredientId: new FormControl(0, [Validators.required]),
      quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
    });
    (this.CreateForm.get('ingredients') as FormArray).push(ingredientGroup);
  }

  addIngredientFormGroup(): FormGroup {
    return this.fb.group({
      ingredientId: [0, [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(1)]],
    });
  }

  updatePrice() {
    let profit = Number(this.CreateForm.get('profit')?.value);
    let price = 0;
    for (let i = 0; i < this.ingredientControls.length; i++) {
      let quantity = Number(this.ingredientControls[i].value.quantity);
      let ingredientId = Number(this.ingredientControls[i].value.ingredientId);

      for (let i = 0; i < this.ingredients.length; i++) {
        if (this.ingredients[i].id == ingredientId) {
          price += this.ingredients[i].unitCost * quantity;
        }
      }
    }

    this.CreateForm.patchValue({ price: price + profit });
  }

  // Remove Ingredient Field
  removeIngredient(index: number) {
    (this.CreateForm.get('ingredients') as FormArray).removeAt(index);
    console.log(this.ingredientControls.length);
    this.updatePrice();
  }

  // Access Ingredients Form Array
  get ingredientControls() {
    return (this.CreateForm.get('ingredients') as FormArray).controls;
  }

  onSubmit() {

    if (this.CreateForm.valid) {
      const formData = this.prepareFormData();
      this.productService.createProdcut(formData).subscribe({
        next: (response: any) => {
          alert('Product created successfully!');
          this.CreateForm.reset();
          (this.CreateForm.get('ingredients') as FormArray).clear(); // Clear ingredients
        },
        error:(error)=>{
          alert("Error while Creating Product");
        }
      });
    }
  }
}
