import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { Login, LoginResponse } from '../../interfaces/iuser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    
  <body>    
    <div class="d-lg-flex half">
      <div class="bg order-1 order-md-2" style="background-image: url('assets/bg-image1.jpg');"></div>
      <div class="contents order-2 order-md-1">
        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div class="col-md-7">
              <h3>Login to <strong>Online Recipes</strong></h3><br><br><br>

              <form [formGroup]="loginIn" (ngSubmit)="submitLogin()">
                <div class="login">
                  <div class="form-group first">
                    <label for="user">Email</label>
                    <input id="user" type="text" formControlName="email" class="form-control"  placeholder="Enter your email" required>                      
                  </div>
                  <div class="form-group last mb-3">
                    <label for="password">Password</label>
                    <input id="password" type="password" formControlName="password" class="form-control" data-type="password" placeholder="Enter your password" required>                      
                  </div>
                  
                  <div class="d-flex mb-5 justify-content-between">
                    <label class="control control--checkbox mb-0"><span class="caption">Remember me</span>
                      <input type="checkbox">
                      <div class="control__indicator"></div>
                    </label>
                    <a href="#" class="member" [routerLink]="['/register']">Not a member?</a>
                  </div>
                    <button type="submit" class="btn btn-block btn-primary">Log In</button> 
                </div>
              </form>

            </div>              
          </div>      
        </div>
      </div>
    </div>
  </body> 

  `,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, 
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {       
  }
    _response!: LoginResponse;
   
    loginIn = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)    
  });

  submitLogin() {
    
    if(this.loginIn.valid) {
      let _obj:Login = {
        email: this.loginIn.value.email as string,
        password: this.loginIn.value.password as string
      }
      this.userService.UserLogin(_obj).subscribe(item => {
        this._response = item;
        console.log(this._response)
        localStorage.setItem('token', this._response.token);
        localStorage.setItem('userName', this._response.userName);
        localStorage.setItem('role', this._response.role);
        this.toastr.success('Login successfully', 'Success');
        this.router.navigateByUrl('/home');
      }, error => {
        this.toastr.error('Failed to login', error.error.title)
      });
    }
  }   
}
