import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor() {}

  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Vegan Sandwich',
      'This is a vegan Sandwich',
      'https://assets.bonappetit.com/photos/5e4c58a55f0567000a32b827/1:1/w_3635,h_3635,c_limit/HLY_Vegan%20Alfredo_Lede.jpg',
      [new Ingredient('Potato', 2), new Ingredient('Salade', 1)]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
