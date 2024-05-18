import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../Modules/material.module';
import { RecipesService } from '../../../services/recipes.service';
import { Recipes } from '../../../interfaces/irecipes';
import { Categories } from '../../../interfaces/icategories';
import { CategoriesService } from '../../../services/categories.service';
import { IngredientsService } from '../../../services/ingredients.service';
import { Ingredients } from '../../../interfaces/iingredients';

@Component({
  selector: 'app-recipes-edit',
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

          <mat-form-field style="width: 70%;">
            <mat-label>Name</mat-label>
            <input formControlName="name" matInput />
          </mat-form-field>

          <mat-form-field style="width: 20%;">
            <mat-label>Approve</mat-label>
              <mat-select formControlName="isApproved" >             
                <mat-option value= "true">True</mat-option>
                <mat-option value= "false">False</mat-option>                
              </mat-select>  
          </mat-form-field>

          <mat-form-field>
            <mat-label>Description</mat-label>
            <textarea 
              formControlName="description" matInput cdkTextareaAutosize 
              #autosize="cdkTextareaAutosize" cdkAutosizeMinRows="1" cdkAutosizeMaxRows="5">
            </textarea>            
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
            <input formControlName="cookingTime" matInput/>
          </mat-form-field>

          <div class="category">
            <div formArrayName="categories" >
              <div *ngFor="let item of Category.controls; let i = index" [formGroupName]="i">
                <mat-form-field>
                  <mat-label>Category</mat-label>
                  <mat-select formControlName="name">  
                    <mat-option *ngFor="let row of categoryList" [value]="row.name">  
                      {{row.name}}  
                    </mat-option>  
                  </mat-select>                           
                </mat-form-field>
              </div>
            </div>
          </div>
          
          <p>Ingredients</p>
          <div formArrayName="ingredients">
            <div *ngFor="let item of Ingredient.controls; let i = index" [formGroupName]="i"><br>
              <mat-form-field class="mat-50">
                <mat-label>Product</mat-label>
                <mat-select formControlName="product">  
                  <mat-option *ngFor="let row of IngredientList" [value]="row.product">  
                    {{row.product}}  
                  </mat-option>  
                </mat-select>                
              </mat-form-field>              
              <div formArrayName="ingredient_Quantities">
                <div *ngFor="let item of Quantity(i).controls; let j = index" [formGroupName]="j">
                  <mat-form-field class="mat-50">
                    <mat-label>Quantity</mat-label>
                    <input formControlName="quantity" matInput/>
                  </mat-form-field>
                    <mat-form-field class="mat-50">
                      <mat-label>Measure</mat-label>
                      <mat-select formControlName="measure" >             
                        <mat-option [value]=0>kg</mat-option>
                        <mat-option [value]=1>gr</mat-option>
                        <mat-option [value]=2>ml</mat-option>
                        <mat-option [value]=3>pc</mat-option>
                        <mat-option [value]=4>un</mat-option>
                      </mat-select>
                    </mat-form-field>
                    <div class="removePre">
                      <button mat-button color="accent" (click)="RemoveIngredient(i)">(remove product)</button>
                    </div>
                </div>
              </div>
            </div>
          </div >

          <div class="add">
            <a mat-button (click)="AddIngredient()">(Add new Ingredient)</a>
          </div>       

          <p>Preparations</p>
          <div formArrayName="preparations">
            <div *ngFor="let item of Preparation.controls; let i = index" [formGroupName]="i">
              <mat-form-field>
                <mat-label>Step</mat-label>
                <textarea 
                  formControlName="steps" matInput cdkTextareaAutosize 
                  #autosize="cdkTextareaAutosize" cdkAutosizeMinRows="1" cdkAutosizeMaxRows="5">
                </textarea>                            
              </mat-form-field>
              <div class="removePre">
                <button mat-button color="accent" (click)="RemovePreparation(i)">(remove step)</button>
              </div>              
            </div>
          </div >
          <div class="add">
            <a mat-button (click)="AddPreparation()">(Add new step)</a>
          </div>
          
          <p>Photo</p>
          <mat-form-field>           
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

  <!-- <div style="text-align: left;">
    <pre> {{recipeForm.value | json}} </pre>
  </div> -->
  
  
  `,
  styleUrl: './recipes-edit.component.css'
})
export class RecipesEditComponent {
  builder: FormBuilder = inject(FormBuilder);
  service: RecipesService = inject(RecipesService);
  serviceCat: CategoriesService = inject(CategoriesService);
  serviceIng: IngredientsService = inject(IngredientsService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);
  categoryList: Categories[] = [];
  IngredientList: Ingredients[] = [];

  constructor() {  
    this.recipeForm.controls['isApproved'].disable(); 
    const recipeListId = Number(this.route.snapshot.params['id']);        
    this.service.GetRecipesById(recipeListId).subscribe(item => {
      this.recipeList = item;      
      if(this.recipeList?.id != undefined) {
        this.title = 'Edit Recipe';
        this.recipeForm.controls['isApproved'].enable();
      }
      this.recipeForm.controls['name'].setValue(this.recipeList.name),
      this.recipeForm.controls['description'].setValue(this.recipeList.description),
      this.recipeForm.controls['difficulty'].setValue(this.recipeList.difficulty),
      this.recipeForm.controls['cookingTime'].setValue(this.recipeList.cookingTime),
      this.recipeForm.controls['photo'].setValue(this.recipeList.photo),
      this.recipeForm.controls['isApproved'].setValue(this.recipeList.isApproved),
      this.recipeForm.controls['categories'].patchValue(this.recipeList.categories)
      for(let item of this.recipeList.ingredients) {
        if(item != undefined) {
          this.AddIngredient();
          this.recipeForm.controls['ingredients'].patchValue(this.recipeList.ingredients)
        }
      };
      for(let item of this.recipeList.preparations) {
        if(item != undefined) {
          this.AddPreparation();
          this.recipeForm.controls['preparations'].patchValue(this.recipeList.preparations)
        }
      };   
    });     

    this.serviceCat.GetAllCategories().subscribe((item: Categories[] ) => {
      this.categoryList = item;
    });
    this.serviceIng.GetAllIngredients().subscribe((item: Ingredients[] ) => {
      this.IngredientList = item;
    })
  } 

  response: any;
  difficulty: any;
  title = 'Create Recipe'; 
  recipeList!: Recipes;
  items!: FormArray;

  recipeForm = new FormGroup({       
    name: new FormControl(''),
    description: new FormControl(''),
    difficulty: new FormControl(0),
    cookingTime: new FormControl(0),
    photo: new FormControl('/assets/noImage.png'),
    isApproved: new FormControl(''),
    ingredients: new FormArray([
      new FormGroup ({
        product: new FormControl(''),
        ingredient_Quantities: new FormArray([
          new FormGroup ({
            quantity: new FormControl(0),
            measure: new FormControl(0)
          })
        ])
      })
    ]),
    categories: new FormArray([
      new FormGroup ({
        name: new FormControl('')
      })
    ]),
    preparations: new FormArray([
      new FormGroup({
        steps: new FormControl('')
      })
    ])
  });

  GetIngredient() {
    return new FormGroup({      
      product: new FormControl(''),
      ingredient_Quantities: new FormArray([
        new FormGroup ({
          quantity: new FormControl(0),
          measure: new FormControl(0)
        })        
      ]),
    });
  }    

  GetPreparation() { return new FormGroup({ steps: new FormControl('') })}
  
  AddIngredient() {
    const control = <FormArray>this.recipeForm.get('ingredients');
    control.push(this.GetIngredient());
  }

  AddPreparation() {
    const control = <FormArray>this.recipeForm.get('preparations');
    control.push(this.GetPreparation());
  }
 
  get Ingredient() { return this.recipeForm.get('ingredients') as FormArray }

  get Category() { return this.recipeForm.get('categories') as FormArray }

  get Preparation() { return this.recipeForm.get('preparations') as FormArray }

  Quantity(index:number) { return this.Ingredient.at(index).get('ingredient_Quantities') as FormArray }  

  RemoveIngredient(index:any) {
    this.items = this.recipeForm.get("ingredients") as FormArray;
    this.items.removeAt(index)
  }

  RemovePreparation(index:any) {
    this.items = this.recipeForm.get("preparations") as FormArray;
    this.items.removeAt(index)
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
    console.log(this.recipeForm);    
    if (this.recipeForm.valid) {
      let _obj: Recipes = {
        id: this.recipeList?.id,
        name: this.recipeForm.value.name as string,
        description: this.recipeForm.value.description as string,
        difficulty: this.recipeForm.value.difficulty as number,
        cookingTime: this.recipeForm.value.cookingTime as number,
        photo: this.recipeForm.value.photo as string,
        ingredients: this.recipeForm.value.ingredients as any,
        createDate: undefined,
        modifiedDate: undefined,
        categories: this.recipeForm.value.categories as any,
        preparations: this.recipeForm.value.preparations as any,
        isApproved: this.recipeForm.value.isApproved as string
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
      console.log(_obj)
      }      
    }
  }  
}

