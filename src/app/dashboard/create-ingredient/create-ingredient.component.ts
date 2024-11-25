import { Component, OnInit } from '@angular/core';
import { Ingredient } from './Ingredient';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IngredientService } from './ingredient.service';

@Component({
  selector: 'app-create-ingredient',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './create-ingredient.component.html',
  styleUrl: './create-ingredient.component.css'
})
export class CreateIngredientComponent implements OnInit {
  ingerdient:Ingredient= {
    name: '',
    quantity: 0,
    unitCost: 0,
    unit: '',
  };;
  CreateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    unitCost: new FormControl('', [Validators.required]),
    unit: new FormControl('', [Validators.required]),
  });

  constructor(private ingredientService:IngredientService){

  }
  ngOnInit(): void {
  }
  onSubmit(){
    if (this.CreateForm.valid) {
    this.ingerdient = {
      name : this.CreateForm.value.name!,
      quantity : Number(this.CreateForm.value.quantity)!,
      unitCost : Number(this.CreateForm.value.unitCost)!,
      unit : this.CreateForm.value.unit!,

    }
    this.ingredientService.createIngredient(this.ingerdient).subscribe({
      next: (data: any) => {
        console.log(data)
        alert("created");
        this.CreateForm.reset();
      },
      error: (error) => {
        alert('Error While Requesting Data');
      },
    });


    console.log(this.ingerdient);
  }
}
}
