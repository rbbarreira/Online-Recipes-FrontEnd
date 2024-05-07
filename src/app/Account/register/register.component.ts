import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
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
              <h3>Register to <strong>Online Recipes</strong></h3><br><br><br>

              <!-- ##### Form ##### -->
              <form [formGroup]="signIn" (ngSubmit)="submitSignIn()">
                <div class="sign-up-form">
                  <div class="form-group first">
                    <label for="create-user">Username</label>
                    <input id="create-user" type="text" formControlName="username" class="form-control" placeholder="Create your Username">
                  </div>
                  <div class="form-group last mb-3">
                    <label for="create-pass">Password</label>
                    <input id="create-pass" type="password" formControlName="password" class="form-control" data-type="password" placeholder="Create your password">
                  </div>
                  <div class="form-group last mb-3">
                    <label for="repeat-pass">Repeat Password</label>
                    <input id="repeat-pass" type="password" formControlName="confirmpassword" class="form-control" data-type="password" placeholder="Repeat your password" >
                  </div>
                  <div class="form-group last mb-3">
                    <label for="email">Email Address</label>
                    <input id="email" type="text" formControlName="email" class="form-control" placeholder="Enter your email address">
                  </div>
                  <div class="d-flex mb-4 align-items-center">
                    <button type="submit" class="btn btn-block btn-primary">Sign Up</button>                        
                  </div>
                  <label for="tab-1" class="member" [routerLink]="['/login']">Already Member?</label>     
                </div>               
              </form>
            </div>
          </div>      
        </div>
      </div>
    </div>
  </body> 

  `,
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private userService: UserService, 
    private toastr: ToastrService, private router: Router) { }

  _response: any;

    signIn = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  submitSignIn() {
    if(this.signIn.valid) {
      let _obj: Register = {
        userName: this.signIn.value.username as string,
        email: this.signIn.value.email as string,
        password: this.signIn.value.password as string,
        confirmPassword: this.signIn.value.confirmpassword as string
      }
      this.userService.UserRegister(_obj).subscribe(item => {
        this._response = item;
        console.log(this._response)
        if(this._response.result=='Success') {
          this.toastr.success('Registration complete successfully', 'Success');
          this.router.navigateByUrl('/login');
        }
      }, error => {
        this.toastr.error('Registration Failed', error.error.message)
      });
    }   
  }  
}

