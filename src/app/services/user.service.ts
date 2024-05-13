import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Register, Login, LoginResponse, User } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }
  readonly url = 'https://localhost:7103/api';

  _menuList = signal<LoginResponse[]>([]);

  UserRegister(data: Register) {
    return this.http.post(this.url + '/Account/Register', data);
  }  

  UserLogin(data: Login) {
    return this.http.post<LoginResponse>(this.url + '/Account/Login', data);
  }

  GetAll() {
    return this.http.get<User[]>(this.url + '/AccountAdmin/List Users');
  }

  GetUserById(id: number) {
    return this.http.get<User>(`${this.url}/AccountAdmin/Search By ${id}`);
  }

  UpdateUser(data: User) {
    return this.http.put(this.url + '/AccountAdmin/Update User', data);
  }
  DeleteUser(id: number) {
    return this.http.delete(`${this.url}/AccountAdmin/Delete By ${id}`);
  }
}

