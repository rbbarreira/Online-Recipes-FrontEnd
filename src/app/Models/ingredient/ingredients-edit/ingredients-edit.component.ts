import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../Modules/material.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IngredientsService } from '../../../services/ingredients.service';
import { ToastrService } from 'ngx-toastr';
import { Ingredients } from '../../../interfaces/iingredients';

@Component({
  selector: 'app-ingredients-edit',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  template: `

<body>
    <form [formGroup]= "ingredientForm" (ngSubmit)="SaveIngredient()">
      <mat-card>
        <mat-card-header>
          <h3>{{title}}</h3>
        </mat-card-header>        
        <mat-card-content>                  
          <mat-form-field class="mat-50">
            <mat-label>Product</mat-label>
            <input formControlName="product" matInput />
          </mat-form-field>           
        </mat-card-content>
        <mat-card-actions>
          <div class="div-50">
            <button type="submit" mat-raised-button color="primary">Save</button>
          </div>
          <div class="div-50">
            <button mat-raised-button color="warn" [routerLink]="['/painel/ingredients']">Cancel</button>
          </div>
        </mat-card-actions>
      </mat-card>
    </form>
  </body>   
  
  `,
  styleUrl: './ingredients-edit.component.css'
})
export class IngredientsEditComponent {
  builder: FormBuilder = inject(FormBuilder);
  service: IngredientsService = inject(IngredientsService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);

  response: any;
  ingredientListId: any;
  ingredientList!: Ingredients | any;
  title = 'Create Ingredient';

  ingredientForm = this.builder.group({    
    product:this.builder.control('')        
  })

  constructor() {

    this.ingredientListId = Number(this.route.snapshot.params['id']);      
    this.service.GetIngredientsById(this.ingredientListId).then(item => {      
      this.ingredientList = item;
      if(this.ingredientList?.id != undefined) {
        this.title = 'Edit Ingredient'; 
      }
      this.ingredientForm.setValue({
        product: this.ingredientList?.product ?? null       
      })
    });    
  }

  SaveIngredient() {
    if (this.ingredientForm.valid) {
      let _obj: Ingredients = {
        id: this.ingredientList?.id,
        product: this.ingredientForm.value.product as string        
      }
      if(this.ingredientList?.id == undefined) {        
      this.service.CreateIngredients(_obj).subscribe(item => {
        this.response = item;
        console.log(this.response)
        if(this.response.result=='Success') {
          this.toastr.success('Create successfully', 'Success');
          this.router.navigateByUrl('/painel/ingredients');
        }
      }, error => {
          this.toastr.error('Failed to create', error.error.message)
      });
      }else {
        this.ingredientList?.id,
      this.service.UpdateIngredients(_obj).subscribe(item => {
        this.response = item;
        console.log(this.response)
        if(this.response.result=='Success') {
          this.toastr.success('Update successfully', 'Success');
          this.router.navigateByUrl('/painel/ingredients');
        }
      }, error => {
          this.toastr.error('Failed to update', error.error.message)
      });
      }      
    }
  }  
}