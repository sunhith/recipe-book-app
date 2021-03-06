import { AuthService } from './../auth/auth.service';
import { ingredient } from './ingredient.model';
import { RecipeService } from './../recipes/recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, 
    private recipeService: RecipeService,
    private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
    .put('https://recipebookapp-6c751-default-rtdb.firebaseio.com/recipes.json', recipes)
    .subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes(){
    // return this.authService.user
    // .pipe(take(1),
    // exhaustMap(user =>{
    //   return this.http
    //   .get<Recipe[]>('https://recipebookapp-6c751-default-rtdb.firebaseio.com/recipes.json')  
    // }),map(recipes => {
    //   return recipes.map(recipe => {
    //     return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
    //   });
    // }),
    // tap(recipes => {
    //   this.recipeService.setRecipes(recipes);
    // }));

    return this.http
    .get<Recipe[]>('https://recipebookapp-6c751-default-rtdb.firebaseio.com/recipes.json')
    .pipe(map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }),
    tap(recipes => {
      this.recipeService.setRecipes(recipes);
    })
    )
  }
}
