import { ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients: ingredient[];
  private igChanged: Subscription;
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients=this.slService.getIngredients();
    // this.igChanged=this.slService.ingredientsChanged.subscribe(
    //   (ingredients:ingredient[])=>{
    //     this.ingredients= ingredients
    //   }
    // )
  }

  onEditItem(index: number){
     this.slService.startedEditing.next(index);
  }

  ngOnDestroy(): void{
    //this.igChanged.unsubscribe();
  }

}
