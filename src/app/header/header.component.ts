import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

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
            <div class="col-md-6">
              <div class="home-account">
                <a href="#login" [routerLink]="['/login']">Login / Register <i class="fa fa-sign-out"></i></a>
                <a href="#">My account <i class="fa fa-user-circle-o"></i></a>
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
                  <li><a href="#home">Home</a></li>
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
export class HeaderComponent {

}
