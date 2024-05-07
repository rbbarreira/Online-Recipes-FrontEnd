import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../Modules/material.module';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterLink],
  template: `
  
  <body>
    @if(UserRole=='Admin') {
      <div>
      <mat-toolbar color="primary" class="mat-elevation-z8">
        <button mat-icon-button (click)= "drawer.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>Account Admin Management</span>
        <span class="example-spacer"></span>
        <span>{{LoginUser}}</span>
          <button mat-button [mat-menu-trigger-for]= "profile"><mat-icon>arrow_drop_down</mat-icon></button>
        <mat-menu #profile>
          <button mat-menu-item>User Profile</button>
        </mat-menu>  
      </mat-toolbar>
      <mat-drawer-container autosize>
        <mat-drawer #drawer opened="true" mode="side" position="start">
          <mat-nav-list>
            <mat-list-item>
              <button mat-button [routerLink]="['/home']"><mat-icon>home</mat-icon>Home</button>
            </mat-list-item>
          </mat-nav-list>
        </mat-drawer>
        <mat-drawer-content>
          <div style="text-align: center; min-height: 600px;"></div>
        </mat-drawer-content>
      </mat-drawer-container>
    </div>
    }@else {
      <div>
      <mat-toolbar color="primary" class="mat-elevation-z8">
        <button mat-icon-button (click)= "drawer.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>Account User Management</span>
        <span class="example-spacer"></span>
        <span>{{LoginUser}}</span>
          <button mat-button [mat-menu-trigger-for]= "profile"><mat-icon>arrow_drop_down</mat-icon></button>
        <mat-menu #profile>
          <button mat-menu-item>User Profile</button>
        </mat-menu>  
      </mat-toolbar>
      <mat-drawer-container autosize>
        <mat-drawer #drawer opened="true" mode="side" position="start">
          <mat-nav-list>
            <mat-list-item>
              <button mat-button [routerLink]="['/home']"><mat-icon>home</mat-icon>Home</button>
            </mat-list-item>
            <mat-list-item>
              <button mat-button [routerLink]="['/recipe']"><mat-icon>home</mat-icon>Recipes</button>
            </mat-list-item>
          </mat-nav-list>
        </mat-drawer>
        <mat-drawer-content>
          <div style="text-align: center; min-height: 600px;"></div>
        </mat-drawer-content>
      </mat-drawer-container>
    </div>
    }    
  </body> 

  `,
  styleUrl: './user.painel.component.css'
})
export class UserPainelComponent implements OnInit, DoCheck {

  constructor() { }

  LoginUser = ''
  UserRole= ''

  ngOnInit(): void {  
  }

  ngDoCheck(): void {
    this.LoginUser=localStorage.getItem('userName') as string;
    this.UserRole=localStorage.getItem('role') as string;
  }  
}
