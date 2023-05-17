import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredients: Ingredient[] = [new Ingredient('Salade', 2)];

  constructor() {}

  getIngredients() {
    const uniqueIngredients: { [name: string]: Ingredient } = {};

    this.ingredients.map((ingredient: Ingredient) => {
      uniqueIngredients[ingredient.name]
        ? (uniqueIngredients[ingredient.name].amount += ingredient.amount)
        : (uniqueIngredients[ingredient.name] = ingredient);
    });

    return Object.values(uniqueIngredients);
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
