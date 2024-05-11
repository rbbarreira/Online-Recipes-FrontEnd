import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `

  <body>
    <header>
      <div id="top-header">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="home-account">
                @if(UserRole!=null) {
                  <a href="#register" [routerLink]="['/painel']">User: {{LoginUser}} <i class="fa fa-user-circle-o"></i></a>                    
                }@else {                   
                  <a href="#login" [routerLink]="['/login']">Login <i class="fa fa-sign-in"></i></a>
                }           
                <button class="logout" (click)="ClearData()">Logout  <i class="fa fa-sign-out"></i></button>               
              </div>
            </div>                           
          </div>
        </div>
      </div>    
      <div id="main-header">
        <div class="container" >
          <div class="row">
            <div class="col-md-3">
              <div class="logo">
                <a href="#"><img src="/assets/logo.png" title="Online Recipes" alt="Logo Website" ></a>
              </div>
            </div>
            <div class="col-md-6">
              <div class="main-menu">
                <ul>
                  <li><a href="#home" [routerLink]="['/home']">Home</a></li>
                  <li><a href="#about" [routerLink]="['/about']">About</a></li>
                  <li><a href="#recipes">Recipes</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
            </div>
            <div class="col-md-3">
              <div class="search-box">  
                <form name="search_form" method="get" class="search_form">
                  <input id="search" type="text" placeholder="search">
                  <input type="submit" id="search-button">
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </body>

  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, DoCheck {  

  constructor(private router: Router, private toastr: ToastrService) { }

  LoginUser = ''
  UserRole= ''

  ngOnInit(): void { }

  ngDoCheck(): void { 
    this.LoginUser=localStorage.getItem('userName') as string;
    this.UserRole=localStorage.getItem('role') as string;   
  }  

  ClearData() {
    localStorage.clear();
    if(this.LoginUser!=null) {
      this.toastr.info('Logout successfully', 'Logout');
    this.router.navigateByUrl('/home');
    }    
  }
}
