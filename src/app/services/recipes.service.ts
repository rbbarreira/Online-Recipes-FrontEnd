import { Injectable } from '@angular/core';
import { IRecipes } from '../interfaces/irecipes';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  url = 'https://localhost:7103/api';

  constructor() { }

  async getAllRecipes() : Promise<IRecipes[]> {
    const data = await fetch(`${this.url}/Recipe/List Recipe`);
    return await data.json() ?? [];
  }

  async getAllRecipesById(id: Number): Promise<IRecipes | undefined> {
    const data = await fetch(`${this.url}/Recipe/Search By ${id}`);
    return await data.json() ?? {};
  }
  
  submitLogin(user: string, password: string) {
    console.log(user, password);
  }

  submitSignin(createUser: string, createPass: string, repeatPass: string, email: string) {
    console.log(createUser, createPass, repeatPass, email);
  }
}
