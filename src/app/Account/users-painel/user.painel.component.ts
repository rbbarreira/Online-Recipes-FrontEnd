import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../Modules/material.module';
import { AppComponent } from "../../app.component";

@Component({
    selector: 'app-painel',
    standalone: true,
    imports: [CommonModule, RouterLink, AppComponent, RouterOutlet, MaterialModule],
    template: `  
  
  <body>      
      <div>
      <mat-toolbar color="primary" class="mat-elevation-z8">
        <button mat-icon-button (click)= "drawer.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>User Board System</span>
        <span class="example-spacer"></span>
        <span>User:{{LoginUser}}</span> <span>Role:{{LoginRole}}</span>
      </mat-toolbar>
      <mat-drawer-container autosize>
        <mat-drawer #drawer opened="true" mode="side" position="start">
          <mat-nav-list>
            <mat-list-item>
              <button mat-button [routerLink]="['/painel/usersSetting']"><mat-icon>home</mat-icon>Board</button>
            </mat-list-item>            
            <mat-list-item>
              <button mat-button [routerLink]="['users']"><mat-icon>group</mat-icon>Users</button>
            </mat-list-item>         
            <mat-list-item>
              <button mat-button [routerLink]="['recipe']"><mat-icon>restaurant_menu</mat-icon>Recipe</button>
            </mat-list-item>
            <mat-list-item>
              <button mat-button [routerLink]="['ingredients']"><mat-icon>shopping_cart</mat-icon>Ingredient</button>
            </mat-list-item> 
            <mat-list-item>
              <button mat-button [routerLink]="['categories']"><mat-icon>category</mat-icon>Category</button>
            </mat-list-item>           
          </mat-nav-list>
        </mat-drawer>
        <mat-drawer-content>
          <div style="text-align: center; min-height: 600px;">
            <router-outlet></router-outlet>
          </div>
        </mat-drawer-content>
      </mat-drawer-container>      
    </div> 
  </body> 
  

  `,
    styleUrl: './user.painel.component.css',

})
export class UserPainelComponent implements OnInit, DoCheck {

  constructor() { }

  LoginUser = ''
  LoginRole = ''

  ngOnInit(): void { }

  ngDoCheck(): void { 
    this.LoginUser=localStorage.getItem('userName') as string; 
    this.LoginRole=localStorage.getItem('role') as string; 
  }  
  
}
