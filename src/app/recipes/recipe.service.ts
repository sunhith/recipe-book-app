import { Subject } from 'rxjs';
import { ingredient } from './../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

//   private recipes: Recipe[]=[
//     new Recipe('Samosa alloo',
//     'Test data','https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg',
//     [new ingredient('Meat',1),
//   new ingredient('French Fries',20)]),
//     new Recipe('Samosa',
//     'Test data','https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg',
//     [new ingredient('Buns',2),
//   new ingredient('Meat',1)])
// ];
  
  private recipes: Recipe[]=[];
  constructor(private slService: ShoppingListService) { }
   
  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
     return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
