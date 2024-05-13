import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredients } from '../interfaces/iingredients';


@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  url = 'https://localhost:7103/api';

  constructor(private http: HttpClient) {} 

  GetAllIngredients() {
    return this.http.get<Ingredients[]>(this.url + '/Ingredient/List Ingredient');
  }

  async GetIngredientsById(id: Number): Promise<Ingredients | undefined> {
    const data = await fetch(`${this.url}/Ingredient/Search By ${id}`);
    return (await data.json()) ?? {};
  }
  
  CreateIngredients(data: Ingredients) {
    return this.http.post(this.url + '/Ingredient/Create Ingredient', data);
  }

  UpdateIngredients(data: Ingredients) {
    return this.http.put(this.url + '/Ingredient/Update Ingredient', data);
  }

  DeleteIngredients(id: number) {
    return this.http.delete(`${this.url}/Ingredient/Delete By ${id}`);
  }
}
