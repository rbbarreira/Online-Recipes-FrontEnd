import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserRegister } from '../interfaces/iuser-register';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }
  readonly url = 'https://localhost:7103/api';

  UserRegister(_data: IUserRegister) {
    return this.http.post(this.url + 'Account/Register', _data);
  }
}
