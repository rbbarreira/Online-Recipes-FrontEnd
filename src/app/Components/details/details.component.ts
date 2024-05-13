import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Difficulty, Recipes, Measure } from '../../interfaces/irecipes';

@Component({
    selector: 'app-details',
    imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
    standalone: true,
    template: `
  
  <app-header></app-header>

  <body>
  <!-- ##### Heading ##### -->
  <div id="heading">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="heading-content">
            <h2>Recipe Details</h2>
            <span>Home / <a href="#">Detail</a></span>
          </div>
        </div>
      </div>
    </div>
  </div> 
  <div class="col-md-12">
    <div class="heading-section">
      <h2>Recipe Details Blog</h2>
      <img src="/assets/under-heading.png" alt="" />
    </div>
  </div> 

  <!-- ##### Recipe Headline ##### -->
  <div class="recipe-post">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">   
          <h2 class="recipe-name">{{ recipesList.name}}</h2>                 
          <img class="recipe-img" [src]="recipesList.photo">                   
        </div>
        <div class="col-12">
          <h5 class="recipe-description"> {{recipesList.description}} </h5> 
        </div> 
      </div>
    </div>       
    <div class="recipe-content">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-8">                                                   
            <div class="recipe-duration">                
              <h6 *ngFor="let item of recipesList?.categories"> Category:  
                  <img src="/assets/category.svg" alt="category" >  {{item.name}}                                                                          
              </h6>
              <h6> Difficulty: 
                <img src="/assets/difficulty.svg" alt="difficulty"> {{ DifficultyEnum(recipesList.difficulty) }}
              </h6>
              <h6> Duration: 
                <img src="/assets/duration.svg" alt="duration"> {{ recipesList.cookingTime }} min
              </h6>                
            </div>            
          </div>
          <div class="col-12 col-md-4">
            <div class="recipe-ratings text-center">
              <div class="ratings">
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star-half-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                
              </div>
                <a href="#" class="btn favorites-btn">Add to favorites <i class="fa fa-heart-o" style="color: #fff;"></i></a>
            </div>
          </div>
        </div>
        <div class="heading-break-line">                           
          <img src="/assets/div-line.png" alt="">
        </div>

        <!-- ##### Preparation ##### -->
        <div class="row">
          <div class="col-12 col-lg-6 text-justify">
            <div class="preparation-step">                      
              <h3>Preparation</h3>                                          
                <div *ngFor="let item of recipesList?.preparations">
                  <div *ngFor="let row of item.steps; let i = 'index+1'">
                    <p><strong>Step {{i}}:</strong><br> {{row}}</p>
                  </div>               
                </div>                 
            </div>                                     
          </div>  
          <div class="col-12 col-lg-2"></div>
          <!-- ##### Ingredients ##### -->
          <div class="col-12 col-lg-4">
            <div class="ingredients">
              <h3>Ingredients</h3>
              <div *ngFor="let item of recipesList?.ingredients ">
                <div *ngFor="let row of item.ingredient_Quantities ">                  
                    <p><i class="fa fa-check" aria-hidden="true" style="color: #40ba37;"></i>
                      {{item.product}} <strong> : </strong> {{row.quantity}} {{MeasureEnum(row.measure)}}
                    </p>
                  
                </div>
              </div>                       
            </div>
          </div>
        </div>        

        <!-- ##### Comments ##### -->
        <div class="row">
          <div class="col-12">
            <div class="section-heading text-left">
              <h3>Leave a comment</h3>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="contact-form-area">
              <form action="#" method="post">
                <div class="row">
                  <div class="col-12 col-lg-6">
                    <input type="text" class="form-control" id="name" placeholder="Name">
                  </div>
                  <div class="col-12 col-lg-6">
                    <input type="email" class="form-control" id="email" placeholder="E-mail">
                  </div>
                  <div class="col-12">
                    <input type="text" class="form-control" id="subject" placeholder="Subject">
                  </div>
                  <div class="col-12">
                    <textarea name="message" class="form-control" id="message" cols="30" rows="10" placeholder="Message"></textarea>
                  </div>
                  <div class="col-12">
                    <button class="btn comment-btn" type="submit">Post Comments</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </body>		

  <app-footer></app-footer>  

  `,
    styleUrl: './details.component.css'
    
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  service = inject(RecipesService);
  recipesList!: Recipes;

  public DifficultyEnum(value : any) { return Difficulty[value]; }

  public MeasureEnum(value : any) { return Measure[value]; }
  
  constructor() {
    const recipesListId = Number(this.route.snapshot.params['id']);
    this.service.GetRecipesById(recipesListId).subscribe(item => {
      this.recipesList = item;
    });
  }
}

