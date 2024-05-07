import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Difficulty, IRecipes } from '../../interfaces/irecipes';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `

  <body>
    <!-- ##### Recipes ##### -->
    <div id="latest-blog">
        <div class="container">
            <div class="blog-post">
                <div class="blog-thumb">
                    <a href="#" [routerLink]="['details', recipesList.id] ">
                        <img [src]="recipesList.photo" alt="Photo of {{ recipesList.name }}">                                
                    </a>
                </div>
                <div class="blog-content">
                    <div class="content-show">
                        <h6> {{ recipesList.name }} </h6>
                        <span> {{ recipesList.cookingTime }} min - {{ DifficultyEnum(recipesList.difficulty) }} </span>
                    </div>                                                
                </div>
            </div>
        </div>
    </div> 
  </body>
  
  `,
  styleUrl: './recipes-list.component.css'
})
export class RecipesListComponent {
  @Input() recipesList!: IRecipes;

  public DifficultyEnum(value : number) {
    return Difficulty[value];
  }
}

