import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categories } from '../interfaces/icategories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  url = 'https://localhost:7103/api';

  constructor(private http: HttpClient) {} 

  GetAllCategories() {
    return this.http.get<Categories[]>(this.url + '/Category/List Category');
  }

  async GetCategoriesById(id: Number): Promise<Categories | undefined> {
    const data = await fetch(`${this.url}/Category/Search By ${id}`);
    return (await data.json()) ?? {};
  }
  
  CreateCategories(data: Categories) {
    return this.http.post(this.url + '/Category/Create Category', data);
  }

  UpdateCategories(data: Categories) {
    return this.http.put(this.url + '/Category/Update Category', data);
  }

  DeleteCategories(id: number) {
    return this.http.delete(`${this.url}/Category/Delete By ${id}`);
  }
}
