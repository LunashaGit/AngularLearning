import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
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
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
