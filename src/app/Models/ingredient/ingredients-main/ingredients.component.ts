import { Component, ViewChild, inject } from '@angular/core';
import { MaterialModule } from '../../../Modules/material.module';
import { Router, RouterLink } from '@angular/router';
import { IngredientsService } from '../../../services/ingredients.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ingredients } from '../../../interfaces/iingredients';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  template: `  

 <body>
  <div class="main-div">  
    <mat-card>
      <mat-card-header>
        <h3>Ingredient List</h3>
        <button class="buttonNew" mat-raised-button color="primary" [routerLink]="['/painel/ingredientsCreate']">
          New Ingredient
        </button>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="dataSource" matSort>
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Id</th>
            <th mat-cell *matCellDef="let element">{{ element.id }}</th>
          </ng-container>

          <ng-container matColumnDef="product">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Product</th>
            <th mat-cell *matCellDef="let element">{{ element.product }}</th>
          </ng-container>
          
          <ng-container matColumnDef="action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <th mat-cell *matCellDef="let element">              
              <button (click)="functionEdit(element.id)" class="action" mat-raised-button 
                [routerLink]="['/painel/ingredientsEdit']">Edit
              </button>                
              <button (click)="functionDelete(element.id)" mat-raised-button color="warn">Delete </button>
            </th>
          </ng-container>

          <tr class="table-header" mat-header-row *matHeaderRowDef="displayColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayColumns"></tr>
        </table>
      </mat-card-content>
      <br>
      <mat-card-footer>
        <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
      </mat-card-footer>
    </mat-card>
  </div>
 </body> 

`,
  styleUrl: './ingredients.component.css'
})
export class IngredientsComponent {
  service: IngredientsService =inject(IngredientsService);
  toastr: ToastrService =inject(ToastrService);
  router: Router =inject(Router);

  ingredientList!: Ingredients[];
  displayColumns: string[] = [ 'id', 'product', 'action', ];
  dataSource: any;
  response: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { this.LoadIngredient(); }  

  LoadIngredient() {
    this.service.GetAllIngredients().subscribe((item) => {
      this.ingredientList = item;
      this.dataSource = new MatTableDataSource<Ingredients>(this.ingredientList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  } 

  functionEdit(id: number) {
    this.router.navigateByUrl('/painel/ingredientsEdit/'+id);
  }

  functionDelete(id: number) {
    if( confirm('Confirm Delete?')) {
      this.service.DeleteIngredients(id).subscribe(item => {
        this.response = item;
        if(this.response.result=='Success') {
          this.toastr.success('Delete successfully', 'Success');
          this.LoadIngredient();
        }
      }, error => {
        this.toastr.error('Delete Failed', error.error.message)
      }); 
    }    
  }
}
