import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./Components/home/home.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HomeComponent, RouterModule],
    template: `  
    
    <router-outlet (deactivate)="scrollToTop()"></router-outlet>        

  `,
  
    styleUrls: ['./app.component.css']    
    
})
export class AppComponent {
  title = 'OnlineRecipes';

  scrollToTop() { 
    document.body.scrollTop = 0 
  };
}

