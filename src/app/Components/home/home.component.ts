import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { Recipes } from '../../interfaces/irecipes';
import { RecipesService } from '../../services/recipes.service';
import { RecipesListComponent } from '../../Models/recipes/recipes-list/recipes-list.component';

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
                <div *ngFor="let item of SearchRecipes">
                    <div *ngIf="item.isApproved == Approved">  
                        <app-recipes-list [recipesList]="item"></app-recipes-list>
                    </div>
                </div>
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
  recipes: Recipes[] = [];
  service: RecipesService = inject(RecipesService);
  Approved = "true";
  SearchRecipes: Recipes[] = [];  
    
  constructor() {
    this.service.GetAllRecipes().subscribe((item: Recipes[] ) => {
        this.recipes = item;
        this.SearchRecipes = item;
    })
  }

  Search(text: string) {
    if(!text) this.SearchRecipes = this.recipes; {}
    
    this.SearchRecipes = this.recipes.filter(search => 
        search?.name.toLowerCase().includes(text.toLowerCase())
    );    
  }  
}
