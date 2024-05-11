import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RecipesService } from '../../services/recipes.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../Modules/material.module';
import { CreateRecipe } from '../../interfaces/irecipes';

@Component({
  selector: 'app-recipes-edit',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  template: `   
  <body>
    <form [formGroup]= "recipeForm" (ngSubmit)="SaveRecipe()">
      <mat-card>
        <mat-card-header>
          <h3>Edit Recipe</h3>
        </mat-card-header>        
        <mat-card-content>
          <mat-form-field>
            <mat-label>Name</mat-label>
            <input formControlName="name" matInput />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Description</mat-label>
            <input formControlName="description" matInput />
          </mat-form-field>   

          <mat-form-field class="mat-50">
            <mat-label>Difficulty</mat-label>
            <mat-select formControlName="difficulty" >             
              <mat-option value="0">Easy</mat-option>
              <mat-option value="1">Medium</mat-option>
              <mat-option value="2">Hard</mat-option>
            </mat-select>  
          </mat-form-field>        
            
          <mat-form-field class="mat-50">
            <mat-label>CookingTime</mat-label>
            <input formControlName="cookingTime" matInput />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Photo</mat-label>
            <input formControlName="photo" matInput />
          </mat-form-field>           
        </mat-card-content>
        <mat-card-actions>
          <div class="div-50">
            <button type="submit" mat-raised-button color="primary">Save</button>
          </div>
          <div class="div-50">
          <button mat-raised-button color="warn" [routerLink]="['/painel/recipe']">Cancel</button>
          </div>
        </mat-card-actions>
      </mat-card>

    </form>

  </body>   
  `,
  styleUrl: './recipes-edit.component.css',
})
export class RecipesEditComponent {
  builder: FormBuilder = inject(FormBuilder);
  service: RecipesService = inject(RecipesService);  
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);

  recipeForm = this.builder.group({    
    id: this.builder.control(0),
    name: this.builder.control(''),
    description: this.builder.control(''),
    difficulty: this.builder.control(0),
    cookingTime: this.builder.control(0),
    photo: this.builder.control(''),
    
  });

  constructor() { }

  response: any;
  difficulty: any; 

  SaveRecipe() {
    if (this.recipeForm.valid) {
      let _obj: CreateRecipe = {
        id: this.recipeForm.value.id as number,
        name: this.recipeForm.value.name as string,
        description: this.recipeForm.value.description as string,
        difficulty: this.recipeForm.value.difficulty as number,
        cookingTime: this.recipeForm.value.cookingTime as number,
        photo: this.recipeForm.value.photo as string
      }      
        this.service.CreateRecipes(_obj).subscribe(item => {
          this.response = item;
          console.log(this.response)
          if(this.response.result=='Success') {
            this.toastr.success('Created successfully', 'Success');
            this.router.navigateByUrl('/painel/recipe');
          }
        }, error => {
            this.toastr.error('Failed to create', error.error.message)
        });        
      } 
  }  
  
}

