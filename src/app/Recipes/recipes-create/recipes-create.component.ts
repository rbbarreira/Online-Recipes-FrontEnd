import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../Modules/material.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CreateRecipe } from '../../interfaces/irecipes';
import { RecipesService } from '../../services/recipes.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes-create',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterLink],
  template: `   
  <body>
    <form [formGroup]= "recipeForm" (ngSubmit)="SaveRecipe()">
      <mat-card>
        <mat-card-header>
          <h3>{{title}}</h3>
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
              <mat-option [value]=0>Easy</mat-option>
              <mat-option [value]=1>Medium</mat-option>
              <mat-option [value]=2>Hard</mat-option>
            </mat-select>  
          </mat-form-field>        
            
          <mat-form-field class="mat-50">
            <mat-label>CookingTime</mat-label>
            <input formControlName="cookingTime" matInput />
          </mat-form-field>

          <mat-form-field class="mat-50">
            <mat-label>Photo</mat-label>
            <div class="fileUploadContainer" [ngStyle]="{'margin-top' : recipeForm.get('photo')!.value ? '5px' :  '20px'}">
              <ng-container *ngIf="recipeForm.get('photo')!.value">
                <img [src]="recipeForm.get('photo')!.value" />                
              </ng-container>       
              <div *ngIf="!recipeForm.get('photo')!.value" fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="10px">
                <mat-icon style="opacity: 60%;">file_upload</mat-icon>
                <button mat-raised-button color="primary" style="width:100%; opacity: 80%;">Browser</button>
                <small style="margin: 20px">Drag and drop here</small>
              </div>       
              <input class="fileInput" type="file" (change)="setFileData($event)"/>
            </div>
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
  styleUrl: './recipes-create.component.css'
})
export class RecipesCreateComponent {
  builder: FormBuilder = inject(FormBuilder);
  service: RecipesService = inject(RecipesService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);

  response: any;
  difficulty: any;
  title = 'Create Recipe';
  isEdit = false;
  recipeListId: any;
  recipeList!: CreateRecipe | any;

  recipeForm = this.builder.group({   
    
    name: this.builder.control(''),
    description: this.builder.control(''),
    difficulty: this.builder.control(0),
    cookingTime: this.builder.control(0),
    photo: this.builder.control('')    
  });

  constructor() {
    
    this.recipeListId = Number(this.route.snapshot.params['id']);
    this.title = 'Edit Recipe';
    this.isEdit = true;
   
    this.service.GetRecipesById(this.recipeListId).then(item => {
      this.recipeList = item;
      this.recipeForm.setValue({
        
        name: this.recipeList?.name,
        description: this.recipeList?.description,
        difficulty: this.recipeList?.difficulty,
        cookingTime: this.recipeList?.cookingTime,
        photo: this.recipeList?.photo
      })
    });      
  }

  setFileData(event: Event): void {
    const eventTarget: HTMLInputElement | null = event.target as HTMLInputElement | null;
    if (eventTarget?.files?.[0]) {
      const file: File = eventTarget.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.recipeForm.get('photo')?.setValue(reader.result as string);
      });
      reader.readAsDataURL(file);
    }
  }  

  SaveRecipe() {
    if (this.recipeForm.valid) {
      let _obj: CreateRecipe = {
        id: this.recipeList?.id,
        name: this.recipeForm.value.name as string,
        description: this.recipeForm.value.description as string,
        difficulty: this.recipeForm.value.difficulty as number,
        cookingTime: this.recipeForm.value.cookingTime as number,
        photo: this.recipeForm.value.photo as string
      }
      if(this.recipeList?.id == undefined) {        
      this.service.CreateRecipes(_obj).subscribe(item => {
        this.response = item;
        console.log(this.response)
        if(this.response.result=='Success') {
          this.toastr.success('Create successfully', 'Success');
          this.router.navigateByUrl('/painel/recipe');
        }
      }, error => {
          this.toastr.error('Failed to create', error.error.message)
      });
      }else {
        this.recipeList?.id,
      this.service.UpdateRecipes(_obj).subscribe(item => {
        this.response = item;
        console.log(this.response)
        if(this.response.result=='Success') {
          this.toastr.success('Update successfully', 'Success');
          this.router.navigateByUrl('/painel/recipe');
        }
      }, error => {
          this.toastr.error('Failed to update', error.error.message)
      });
      }      
    }
  }  
}

