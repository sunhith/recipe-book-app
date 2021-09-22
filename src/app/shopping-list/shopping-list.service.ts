import { ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged= new Subject<ingredient[]>();
  startedEditing= new Subject<number>();
  ingredients: ingredient[]=[
    new ingredient('Apples',5),
    new ingredient('Tomatoes',10)
];

  constructor() { }

  getIngredients(){
    return this.ingredients;
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: ingredient){
    this.ingredients.push(ingredient);
   // this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients:ingredient[]){
     this.ingredients.push(...ingredients);
    // this.ingredientsChanged.next(this.ingredients.slice())
  }

  updateIngredient(index: number, newIngredient: ingredient){
    this.ingredients[index] = newIngredient;
    // this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    // this.ingredientsChanged.next(this.ingredients.slice());
  }
}
