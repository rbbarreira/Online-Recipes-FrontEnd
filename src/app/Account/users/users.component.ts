import { Component, ViewChild, inject } from '@angular/core';
import { MaterialModule } from '../../Modules/material.module';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserPainelComponent } from "../users-painel/user.painel.component";
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../../interfaces/iuser';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [MaterialModule, RouterLink, UserPainelComponent],
    template: `

    <body>
      <mat-card>
        <mat-card-header>
          <h3>Users List</h3>          
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]= "dataSource">

            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>Id</th>
              <th mat-cell *matCellDef= "let element">{{element.id}}</th>
            </ng-container>

            <ng-container matColumnDef="userName">
              <th mat-header-cell *matHeaderCellDef>Username</th>
              <th mat-cell *matCellDef= "let element">{{element.userName}}</th>
            </ng-container>

            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>Email</th>
              <th mat-cell *matCellDef= "let element">{{element.email}}</th>
            </ng-container>

            <ng-container matColumnDef="role">
              <th mat-header-cell *matHeaderCellDef>Role</th>
              <th mat-cell *matCellDef= "let element">{{element.role}}</th>
            </ng-container>

            <ng-container matColumnDef="action">
              <th mat-header-cell *matHeaderCellDef>Action</th>
              <th mat-cell *matCellDef= "let element">
                <button (click)="functionEdit(element.id)" class="action" mat-raised-button [routerLink]="['/painel/userEdit']">
                  Edit
                </button>
                <button (click)="functionDelete(element.id)" mat-raised-button color="warn">Delete</button>
              </th>
            </ng-container>

            <tr class="table-header" mat-header-row *matHeaderRowDef= "displayColumns"></tr>
            <tr mat-row *matRowDef= "let row;columns:displayColumns"></tr>

          </table>
        </mat-card-content>
        <br>
        <mat-card-footer>
          <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
        </mat-card-footer>
      </mat-card>
    </body>
  `,
    styleUrl: './users.component.css',
    
})
export class UsersComponent {
  service: UserService =inject(UserService);
  router: Router =inject(Router);
  toastr: ToastrService =inject(ToastrService);

  usersList!: User[];
  displayColumns: string[] = ["id","userName", "email", "role", "action"];
  dataSource: any;
  response: any;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { this.LoadUser(); }  

  LoadUser() {
    this.service.GetAll().subscribe(item => {
      this.usersList=item;
      this.dataSource = new MatTableDataSource<User>(this.usersList);
      this.dataSource.paginator = this.paginator;
    })
  }

  functionEdit(id: number) {
    this.router.navigateByUrl('/painel/userEdit/'+id);
  }

  functionDelete(id: number) {
    if( confirm('Confirm Delete?')) {
      this.service.DeleteUser(id).subscribe(item => {
        this.response = item;
        if(this.response.result=='Success') {
          this.toastr.success('Delete successfully', 'Success');
          this.LoadUser();
        }
      }, error => {
        this.toastr.error('Delete Failed', error.error.message)
      }); 
    }    
  }
}
