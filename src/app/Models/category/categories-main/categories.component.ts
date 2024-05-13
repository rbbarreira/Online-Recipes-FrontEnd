import { Component, ViewChild, inject } from '@angular/core';
import { MaterialModule } from '../../../Modules/material.module';
import { Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../../../services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { Categories } from '../../../interfaces/icategories';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  template: `  

<body>
  <div class="main-div">  
    <mat-card>
      <mat-card-header>
        <h3>Category List</h3>
        <button class="buttonNew" mat-raised-button color="primary" [routerLink]="['/painel/categoriesCreate']">
          New Category
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
          
          <ng-container matColumnDef="action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <th mat-cell *matCellDef="let element">              
              <button (click)="functionEdit(element.id)" class="action" mat-raised-button 
                [routerLink]="['/painel/categoriesEdit']">Edit
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
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  service: CategoriesService =inject(CategoriesService);
  toastr: ToastrService =inject(ToastrService);
  router: Router =inject(Router);

  categoryList!: Categories[];
  displayColumns: string[] = [ 'id', 'name', 'action', ];
  dataSource: any;
  response: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { this.LoadCategory(); }  

  LoadCategory() {
    this.service.GetAllCategories().subscribe((item) => {
      this.categoryList = item;
      this.dataSource = new MatTableDataSource<Categories>(this.categoryList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  } 

  functionEdit(id: number) {
    this.router.navigateByUrl('/painel/categoriesEdit/'+id);
  }

  functionDelete(id: number) {
    if( confirm('Confirm Delete?')) {
      this.service.DeleteCategories(id).subscribe(item => {
        this.response = item;
        if(this.response.result=='Success') {
          this.toastr.success('Delete successfully', 'Success');
          this.LoadCategory();
        }
      }, error => {
        this.toastr.error('Delete Failed', error.error.message)
      }); 
    }    
  }
}
