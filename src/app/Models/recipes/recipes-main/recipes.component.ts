import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Difficulty, Recipes } from '../../../interfaces/irecipes';
import { RecipesService } from '../../../services/recipes.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MaterialModule } from '../../../Modules/material.module';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  template: `
    <body>
      <mat-card>
        <mat-card-header>
          <h3>Recipes List</h3>
          <button class="buttonNew" mat-raised-button color="primary" [routerLink]="['/painel/recipeCreate']">
            New Recipe
          </button>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="dataSource" matSort>
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Id</th>
              <th mat-cell *matCellDef="let element">{{ element.id }}</th>
            </ng-container>

            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
              <th mat-cell *matCellDef="let element">{{ element.name }}</th>
            </ng-container>

            <ng-container matColumnDef="difficulty">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Difficulty</th>
              <th mat-cell *matCellDef="let element">{{ DifficultyEnum(element.difficulty) }}</th>
            </ng-container>

            <ng-container matColumnDef="cookingTime">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Cooking Time</th>
              <th mat-cell *matCellDef="let element">{{ element.cookingTime }}</th>
            </ng-container>

            <ng-container matColumnDef="isApproved">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Approved</th>
              <th mat-cell *matCellDef="let element">{{ element.isApproved }}</th>
            </ng-container>

            <ng-container matColumnDef="action">
              <th mat-header-cell *matHeaderCellDef>Action</th>
              <th mat-cell *matCellDef="let element">              
                <button (click)="functionEdit(element.id)" class="action" mat-raised-button 
                  [routerLink]="['/painel/recipeEdit']">Edit
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
    </body>
  `,
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  service: RecipesService =inject(RecipesService);
  toastr: ToastrService =inject(ToastrService);
  router: Router =inject(Router);

  recipeList!: Recipes[];
  displayColumns: string[] = [ 'id', 'name', 'difficulty', 'cookingTime', 'isApproved', 'action', ];
  dataSource: any;
  response: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { this.LoadRecipe(); }  

  LoadRecipe() {
    this.service.GetAllRecipes().subscribe((item) => {
      this.recipeList = item;
      this.dataSource = new MatTableDataSource<Recipes>(this.recipeList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public DifficultyEnum(value: number) { return Difficulty[value]; }

  functionEdit(id: number) {
    this.router.navigateByUrl('/painel/recipeEdit/'+id);
  }

  functionDelete(id: number) {
    let UseRole = localStorage.getItem('role') as string;    
    if( UseRole === 'Admin') {
      if(confirm('Confirm Delete?')) {
        this.service.DeleteRecipes(id).subscribe(item => {
          this.response = item;
          if(this.response.result=='Success') {
            this.toastr.success('Delete successfully', 'Success');
            this.LoadRecipe();
          }
          }, error => {
            this.toastr.error('Delete Failed', error.error.message)
        });   
      }      
    }else {
      this.toastr.warning('Unauthorizes Access');
    }    
  } 
}