export interface Recipes {
  id: number;
  name: string;
  description: string;
  difficulty: Difficulty;
  cookingTime: number;
  photo: string;
  createDate: any;
  modifiedDate: any;
  isApproved: string;
  ingredients: Ingredients[];
  categories: Categories[];  
  preparations: Preparations[];
}

export enum Difficulty {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}

export interface Categories {
  id: number;
  name: string;  
}

export interface Ingredients {
  id: number;
  product: string;
  ingredient_Quantities: Ingredient_Quantities[];
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

export interface Preparations {
  id: number;
  steps: string;
}

export interface Ratings {
  id: number;
  star: number;
}

export interface Comments {
  id: number;
  usersComment: string;
}
