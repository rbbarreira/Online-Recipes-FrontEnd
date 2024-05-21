import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../Modules/material.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../../../services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { Categories } from '../../../interfaces/icategories';

@Component({
  selector: 'app-categories-edit',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MaterialModule],
  template: `

<body>
    <form [formGroup]= "categoryForm" (ngSubmit)="SaveCategory()">
      <mat-card>
        <mat-card-header>
          <h3>{{title}}</h3>
        </mat-card-header>        
        <mat-card-content>                  
          <mat-form-field class="mat-50">
            <mat-label>Name</mat-label>
            <input formControlName="name" matInput />
          </mat-form-field>           
        </mat-card-content>
        <mat-card-actions>
          <div class="div-50">
            <button type="submit" mat-raised-button color="primary">Save</button>
          </div>
          <div class="div-50">
            <button mat-raised-button color="warn" [routerLink]="['/painel/categories']">Cancel</button>
          </div>
        </mat-card-actions>
      </mat-card>
    </form>
  </body>   
  
  `,
  styleUrl: './categories-edit.component.css'
})
export class CategoriesEditComponent {
  builder: FormBuilder = inject(FormBuilder);
  service: CategoriesService = inject(CategoriesService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);

  response: any;
  categoryListId: any;
  categoryList!: Categories | any;
  title = 'Create Category';

  categoryForm = this.builder.group({    
    name:this.builder.control('')        
  })

  constructor() {

    this.categoryListId = Number(this.route.snapshot.params['id']);      
    this.service.GetCategoriesById(this.categoryListId).then(item => {      
      this.categoryList = item;
      if(this.categoryList?.id != undefined) {
        this.title = 'Edit Category'; 
      }
      this.categoryForm.setValue({
        name: this.categoryList?.name ?? null       
      })
    });    
  }

  SaveCategory() {
    if (this.categoryForm.valid) {
      let _obj: Categories = {
        id: this.categoryList?.id,
        name: this.categoryForm.value.name as string        
      }
      if(this.categoryList?.id == undefined) {        
      this.service.CreateCategories(_obj).subscribe(item => {
        this.response = item;
        console.log(this.response)
        if(this.response.result=='Success') {
          this.toastr.success('Create successfully', 'Success');
          this.router.navigateByUrl('/painel/categories');
        }
      }, error => {
          this.toastr.error('Failed to create', error.error.message)
      });
      }else {
        this.categoryList?.id,
      this.service.UpdateCategories(_obj).subscribe(item => {
        this.response = item;
        console.log(this.response)
        if(this.response.result=='Success') {
          this.toastr.success('Update successfully', 'Success');
          this.router.navigateByUrl('/painel/categories');
        }
      }, error => {
          this.toastr.error('Failed to update', error.error.message)
      });
      }      
    }
  }  
}
