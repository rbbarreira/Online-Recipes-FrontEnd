import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Register, Login, LoginResponse, ListUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }
  readonly url = 'https://localhost:7103/api';

  _menuList = signal<LoginResponse[]>([]);

  UserRegister(_data: Register) {
    return this.http.post(this.url + '/Account/Register', _data);
  }  

  UserLogin(_data: Login) {
    return this.http.post<LoginResponse>(this.url + '/Account/Login', _data);
  }  

  GetUser(_data: ListUser) {
    return this.http.get(this.url + 'AccountAdmin/List Users - Admin');
  }  
}
