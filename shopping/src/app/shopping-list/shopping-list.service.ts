import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientListChanged = new EventEmitter<Ingredient[]>();
  private ingredientsList: Ingredient[] = [
    new Ingredient('Something 1', 5),
    new Ingredient('Something 2', 8),
  ];

  getIngredients() {
    return this.ingredientsList.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredientsList.push(ingredient);
    this.ingredientListChanged.emit(this.ingredientsList.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredientsList.push(...ingredients);
    this.ingredientListChanged.emit(this.ingredientsList.slice());
  }
}
