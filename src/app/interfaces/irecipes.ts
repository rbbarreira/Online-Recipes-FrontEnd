export interface Recipes {
  id: number;
  name: string;
  description: string;
  difficulty: Difficulty;
  cookingTime: number;
  photo: string;
  createDate: any;
  modifiedDate: any;
  ingredients: Ingredients[];
  categories: Categories[];
  rating: Ratings[];
  preparations: Preparations[];
  comment: Comments[];
}

export enum Difficulty {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}

export interface Preparations {
  steps: string[];
}

export interface Ingredients {
  product: string;
  ingredient_Quantities: Ingredient_Quantities[];
}

export interface Categories {
  id: number;
  name: string;  
}

export interface Ingredient_Quantities {
  id: number;
  quantity: number;
  measure: Measure;
}

export enum Measure {
  kg = 0,
  g = 1,
  ml = 2,
  pc = 3,
  un = 4,
}

export interface Ratings {
  star: number;
}

export interface Comments {
  usersComment: string;
}

export interface CreateRecipe {
  id: number,
  name: string;
  description: string;
  difficulty: Difficulty;
  cookingTime: number;
  photo: string,
  ingredients: Ingredients[];
}


