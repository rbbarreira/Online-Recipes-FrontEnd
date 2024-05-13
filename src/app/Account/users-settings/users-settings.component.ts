import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-settings',
  standalone: true,
  imports: [RouterLink],
  template: `

  <body>
  <div class="content-wrapper">
      <div class="container-xxl flex-grow-1 container-p-y"><br>
        <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">UI Management /</span> User Board</h4><br>            
        <div class="row mb-5">
          <div class="col-md-6 col-lg-4 mb-3">
            <div class="card h-80">
              <img src="../assets/Home.png" alt="Users image" />
              <div class="card-body">
                <h5 class="card-title">Home Page</h5><br>                      
                <a href="#" class="btn btn-outline-primary">Enter</a>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-3">
            <div class="card h-80">
              <img class="card-img-top" src="../assets/settings.png" alt="Users image" />
              <div class="card-body">
                <h5 class="card-title">Settings</h5><br>                      
                <a href="#" [routerLink]="['/painel/settings']" class="btn btn-outline-primary">Enter</a>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-3">
            <div class="card h-100">
              <img class="card-img-top" src="../assets/users.png" alt="Users image" />
              <div class="card-body">
                <h5 class="card-title">Users</h5><br>                      
                <a href="#" [routerLink]="['/painel/users']" class="btn btn-outline-primary">Enter</a>
              </div>
            </div>
          </div>  
        </div>              
      </div> 
      <div class="container-xxl flex-grow-1 container-p-y">
        <div class="row mb-5">             
          <div class="col-md-6 col-lg-4 mb-3">
            <div class="card h-80">
              <img class="card-img-top" src="../assets/recipes.png" alt="Users image" />
              <div class="card-body">
                <h5 class="card-title">Recipes</h5><br>                      
                <a href="#" [routerLink]="['/painel/recipe']" class="btn btn-outline-primary">Enter</a>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-3">
            <div class="card h-80">
              <img class="card-img-top" src="../assets/ingredients.png" alt="Users image" />
              <div class="card-body">
                <h5 class="card-title">Ingredients</h5><br>                      
                <a href="#" [routerLink]="['/painel/ingredients']" class="btn btn-outline-primary">Enter</a>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-3">
            <div class="card h-100">
              <img class="card-img-top" src="../assets/categories.png" alt="Users image" />
              <div class="card-body">
                <h5 class="card-title">Categories</h5><br>                      
                <a href="#" [routerLink]="['/painel/categories']" class="btn btn-outline-primary">Enter</a>
              </div>
            </div>
          </div>
        </div>              
      </div>  
    </div>
  </body>

  `,
  styleUrl: './users-settings.component.css'
})
export class UsersSettingsComponent {

}
