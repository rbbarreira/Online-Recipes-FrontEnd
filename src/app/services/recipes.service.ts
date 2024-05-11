import { Injectable } from '@angular/core';
import { CreateRecipe, IRecipes } from '../interfaces/irecipes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  url = 'https://localhost:7103/api';

  constructor(private http: HttpClient) {} 

  GetAllRecipes() {
    return this.http.get<IRecipes[]>(this.url + '/Recipe/List Recipes');
  }

  async GetRecipesById(id: Number): Promise<IRecipes | undefined> {
    const data = await fetch(`${this.url}/Recipe/Search By ${id}`);
    return (await data.json()) ?? {};
  }
  
  CreateRecipes(data: CreateRecipe) {
    return this.http.post(this.url + '/Recipe/Create Recipe', data);
  }

  UpdateRecipes(data: CreateRecipe) {
    return this.http.put(this.url + '/Recipe/Update Recipe', data);
  }

  DeleteRecipes(id: number) {
    return this.http.delete(this.url + '/Recipe/Delete By?=' + id);
  }
}