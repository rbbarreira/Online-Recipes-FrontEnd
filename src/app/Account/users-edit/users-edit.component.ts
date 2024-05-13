import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../Modules/material.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/iuser';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterLink],
  template: `

<body>
    <form [formGroup]= "userForm" (ngSubmit)= "SaveUser()">
      <mat-card>
        <mat-card-header>
          <h3>User Edit</h3>
        </mat-card-header>        
        <mat-card-content>
          <mat-form-field class="mat-50">
            <mat-label>Id</mat-label>
            <input formControlName="id" matInput />
          </mat-form-field>
          <mat-form-field class="mat-50">
            <mat-label>Role</mat-label>
            <mat-select formControlName="role" >             
              <mat-option value= "Admin">Admin</mat-option>
              <mat-option value= "User">User</mat-option>
              <mat-option value= "Guest">Guest</mat-option>
            </mat-select>  
          </mat-form-field>  
          <mat-form-field class="mat-50">
            <mat-label>UserName</mat-label>
            <input formControlName="userName" matInput />
          </mat-form-field>
          <mat-form-field class="mat-50">
            <mat-label>Email</mat-label>
            <input formControlName="email" matInput />
          </mat-form-field>   
        </mat-card-content>
        <mat-card-actions>
          <div class="div-50">
            <button type="submit" mat-raised-button color="primary">Save</button>
          </div>
          <div class="div-50">
            <button mat-raised-button color="warn" [routerLink]="['/painel/users']">Cancel</button>
          </div>
        </mat-card-actions>
      </mat-card>
    </form>
  </body>   
  
  `,
  styleUrl: './users-edit.component.css'
})
export class UsersEditComponent {
  builder: FormBuilder = inject(FormBuilder);
  service: UserService = inject(UserService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);

  response: any;
  userListId: any;
  userList!: User;

  userForm = this.builder.group({
    id:this.builder.control(0),
    userName:this.builder.control(''),
    email:this.builder.control(''),
    role:this.builder.control(''),
    passwordHash:this.builder.control(''),
    passwordSalt:this.builder.control('')         
  })

  constructor() {

    this.userListId = Number(this.route.snapshot.params['id']);
    this.userForm.controls['id'].disable();
    this.service.GetUserById(this.userListId).subscribe(item => {
      this.userList = item;
      this.userForm.setValue({
        id: this.userList?.id,
        userName: this.userList?.userName,
        email: this.userList?.email,
        role: this.userList?.role,
        passwordHash: this.userList?.passwordHash,
        passwordSalt: this.userList?.passwordSalt
      })
    });    
  }

  SaveUser() {
    if(this.userForm.valid) {
      let _obj: User = {
        id: this.userList?.id,
        userName: this.userForm.value.userName as string,
        email: this.userForm.value.email as string,
        role: this.userForm.value.role as string,
        passwordHash: this.userList?.passwordHash,
        passwordSalt: this.userList?.passwordSalt
      };
      _obj.id = this.userListId;      
      this.service.UpdateUser(_obj).subscribe(item => {
        this.response = item;
        console.log(this.response)
        if(this.response.result=='Success') {
          this.toastr.success('Update successfully', 'Success');
          this.router.navigateByUrl('/painel/users');
        }
      }, error => {
          this.toastr.error('Failed to create', error.error.message)
      })            
    }
  }
}