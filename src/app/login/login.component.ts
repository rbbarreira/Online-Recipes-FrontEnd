import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';
import { IUserRegister } from '../interfaces/iuser-register';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    
  <body>
    <div class="d-lg-flex half">
      <div class="bg order-1 order-md-2" style="background-image: url('assets/bg-image1.jpg');"></div>
      <div class="contents order-2 order-md-1">
        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div class="col-md-7">
              <h3>Login to <strong>Online Recipes</strong></h3>

              <!-- ##### Modal ##### -->      
              <div class="login-snip">                
                <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Login</label>
                <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label>
          
                <!-- ##### Form ##### -->
                <div class="login-space">

                  <form [formGroup]="loginIn" (ngSubmit)="submitLogin()">
                    <div class="login">
                      <div class="form-group first">
                        <label for="user">Username</label>
                        <input id="user" type="text" formControlName="user" class="form-control"  placeholder="Enter your username" required>                      
                      </div>
                      <div class="form-group last mb-3">
                        <label for="password">Password</label>
                        <input id="password" type="password" formControlName="pass" class="form-control" data-type="password" placeholder="Enter your password" required>                      
                      </div>

                      <!-- ##### Radio - Remember Me ##### -->
                      <div class="d-flex mb-5 justify-content-between">
                        <label class="control control--checkbox mb-0"><span class="caption">Remember me</span>
                          <input type="checkbox">
                          <div class="control__indicator"></div>
                        </label>
                        <span class="ml-auto"><a href="#" class="forgot-pass">Forgot Password</a></span> 
                      </div>
                      <button type="submit" class="btn btn-block btn-primary">Log In</button> 
                    </div>
                  </form>

                  <!-- ##### Form ##### -->
                  <form [formGroup]="signIn" (ngSubmit)="submitSignin()">
                    <div class="sign-up-form">
                      <div class="form-group first">
                        <label for="create-user">Username</label>
                        <input id="create-user" type="text" formControlName="UserName" class="form-control" placeholder="Create your Username">
                      </div>
                      <div class="form-group last mb-3">
                        <label for="create-pass">Password</label>
                        <input id="create-pass" type="password" formControlName="Password" class="form-control" data-type="password" placeholder="Create your password">
                      </div>
                      <div class="form-group last mb-3">
                        <label for="repeat-pass">Repeat Password</label>
                        <input id="repeat-pass" type="password" formControlName="ConfirmPassword" class="form-control" data-type="password" placeholder="Repeat your password" >
                      </div>
                      <div class="form-group last mb-3">
                        <label for="email">Email Address</label>
                        <input id="email" type="text" formControlName="Email" class="form-control" placeholder="Enter your email address">
                      </div>
                      <div class="d-flex mb-4 align-items-center">
                        <button type="submit" class="btn btn-block btn-primary">Sign Up</button>                        
                      </div>
                      <label for="tab-1" class="member">Already Member?</label>     
                    </div>               
                  </form> 
                </div>
              </div>   <!-- ##### Modal End ##### --> 
            </div>
          </div>      
        </div>
      </div>
    </div>
  </body> 

  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  recipesService = inject(RecipesService);

  constructor(private builder: FormBuilder, private service: UserService) {

  }

  _response: any;

  _regform = this.builder.group({
    username: this.builder.control('', Validators.compose([Validators.required])),
    email: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    confirmepassword: this.builder.control('', Validators.required)
  })

    loginIn = new FormGroup({
    user: new FormControl(''),
    pass: new FormControl(''),       
  });

  submitLogin() {
      this.recipesService.submitLogin(
      this.loginIn.value.user ?? '',
      this.loginIn.value.pass ?? ''
    )
  }
  
    signIn = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
    ConfirmPassword: new FormControl('', Validators.required)    
  });

  submitSignin() {
    if(this.signIn.valid) {
      let _obj: IUserRegister = {
        userName: this.signIn.value.UserName as string,
        email: this.signIn.value.Email as string,
        password: this.signIn.value.Password as string,
        confirmPassword: this.signIn.value.ConfirmPassword as string
      }
      this.service.UserRegister(_obj).subscribe(item => {
        this._response = item;
        if(this._response.result=='pass') {

        }else{

        }

      });
    }   
  }  
  
}
