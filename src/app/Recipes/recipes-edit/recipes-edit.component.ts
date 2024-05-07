import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserPainelComponent } from '../../Account/user.painel/user.painel.component';

@Component({
  selector: 'app-recipes-edit',
  standalone: true,
  imports: [CommonModule, UserPainelComponent],
  template: `
  
  
 
  <body>
  <app-menu></app-menu>


  <h1>Recipes Work</h1>

  </body>


  `,
  styleUrl: './recipes-edit.component.css'
})
export class RecipesEditComponent {

}
