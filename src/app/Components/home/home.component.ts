import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RecipesListComponent } from '../../Recipes/recipes-list/recipes-list.component';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { IRecipes } from '../../interfaces/irecipes';
import { RecipesService } from '../../services/recipes.service';

@Component({
    selector: 'app-home',
    imports: [CommonModule, RecipesListComponent, FooterComponent, HeaderComponent],
    standalone: true,
    template: `

<app-header></app-header>

<body>
    <!-- ##### Heading ##### -->
    <div class="img-heading">
        <div class="frame">                    
            <div class="frame-caption">
                <h1>Life is too short to eat boring food</h1>                                                      
            </div>
            <img src="/assets/cooking.jpg" alt="" />                                        
        </div>
    </div>    
    <div class="container" id="info">                    
        <div class="heading-section">
            <h2>Introduction</h2>
            <img src="/assets/under-heading.png" alt="" >
        </div>
        <div class="introduction">
            <p>Explore the Portuguese cuisine and embrace the <br>spices and ingredients typical of Mediterranean</p>    
            <p>Celebrating a life filled with hundreds of easy make <br>recipes that can effortlessly re-created 
            in any home kitchen</p>
            <blockquote>
                <p>&ldquo;Cooking is an art, but all art requires knowing <br>something about the techniques and materials&rdquo;</p>
                <div class="quote">&mdash; Nathan Myhrvold</div>
            </blockquote>                                      
        </div>
    </div>

    <!-- ##### Recipes ##### -->
    <div class="heading-section" id="recipes">
        <h2>Recipes</h2>
            <img src="/assets/under-heading.png" alt="" >
        </div>    
    <div class="container">
        <div class="row">
            <div class="grid-recipes">    
                <app-recipes-list
                *ngFor="let recipesList of recipesLocationList" [recipesList]="recipesList">          
                </app-recipes-list>
            </div>
        </div>
    </div>
    
    <!-- ##### Contact Us ##### -->
    <div class="container">
        <div class="row" id="contact">
            <div class="col-md-12">
                <div class="heading-section">
                    <h2>Feel free to send a message</h2>
                    <img src="/assets/under-heading.png" alt="" >
                </div>
            </div>
        </div>            
        <div class="container" id="contact-us">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-8">  
                            <div class="message-form">
                                <form action="#" method="post" class="send-message">
                                    <div class="row">
                                        <div class="name col-md-4">
                                            <input type="text" name="name" id="name" placeholder="Name" />
                                        </div>
                                        <div class="email col-md-4">
                                            <input type="text" name="email" id="email" placeholder="Email" />
                                        </div>
                                        <div class="subject col-md-4">
                                            <input type="text" name="subject" id="subject" placeholder="Subject" />
                                        </div>
                                    </div>
                                    <div class="row">        
                                        <div class="text col-md-12">
                                            <textarea name="text" placeholder="Message"></textarea>
                                        </div>   
                                    </div>                              
                                    <div class="send">
                                        <button type="submit">Send</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="info">
                                <p>For a question about recipes or ingredients, please fill the form and our email team will get in touch as soon as possible. </p>
                                <ul>
                                    <li><i class="fa fa-phone"></i>123-456-789</li>
                                    <li><i class="fa fa-globe"></i>456 Home Made Studios, Unknown Street, Lisbon</li>
                                    <li><i class="fa fa-envelope"></i><a href="#">homemade&#64;company.com</a></li>
                                </ul>
                            </div>
                        </div>     
                    </div>
                </div>
            </div>
        </div>             
    </div> 
</body>

<app-footer></app-footer>
    
  `,
    styleUrl: './home.component.css',
    
})
export class HomeComponent {
  recipesLocationList: IRecipes[] = [];
  recipesService: RecipesService = inject(RecipesService);

  constructor() {
    this.recipesService.getAllRecipes().then((recipesLocationList: IRecipes[] ) => {
        this.recipesLocationList = recipesLocationList;
    })
  }
}
