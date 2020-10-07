import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipeList: Recipe[] = [
    new Recipe('Samosa', 'Tasty Samosa, Too Yummy!', 'assets/samosa.jpeg', [
      new Ingredient('Potato', 1),
      new Ingredient('Maida', 1),
    ]),
    new Recipe('Pizza', 'Tasty Pizza, Too Delicious!', 'assets/pizza.jpeg', [
      new Ingredient('Onion', 1),
      new Ingredient('Cheese', 1),
      new Ingredient('Bread', 1),
      new Ingredient('Corn', 1),
    ]),
    new Recipe('Burger', 'Tasty Burger, Too Yummy!', 'assets/burger.png', [
      new Ingredient('Buns', 2),
      new Ingredient('Onion slice', 1),
      new Ingredient('Cabbage', 1),
      new Ingredient('Patty', 1),
      new Ingredient('Cheese slice', 1),
    ]),
  ];

  constructor(private shoppingListService: ShoppingListService) {}
  getRecipes() {
    return this.recipeList.slice();
  }

  getRecipe(id: number) {
    return this.recipeList.slice()[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
