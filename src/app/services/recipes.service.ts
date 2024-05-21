import { Injectable } from '@angular/core';
import { Recipes } from '../interfaces/irecipes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private readonly url = 'https://localhost:7103/api';

  constructor(private http: HttpClient) {} 

  GetAllRecipes() {
    return this.http.get<Recipes[]>(this.url + '/Recipe/List Recipes');
  }
  
  GetRecipesById(id: number) {
    return this.http.get<Recipes>(`${this.url}/Recipe/Search By ${id}`);
  }  
  
  CreateRecipes(data: Recipes) {
    return this.http.post(this.url + '/Recipe/Create Recipe', data);
  }

  UpdateRecipes(data: Recipes) {
    return this.http.put(this.url + '/Recipe/Update Recipe', data);
  }

  DeleteRecipes(id: number) {
    return this.http.delete(`${this.url}/Recipe/Delete By ${id}`);
  }

  GetRecipesByCategory(data: string) {
    return this.http.get<Recipes>(`${this.url}/Recipe/Search By Category?name= ${data}`);
  } 
}
