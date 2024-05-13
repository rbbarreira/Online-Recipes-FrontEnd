import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  template: `

<body>    
    <div class="container-xxl container-p-y">
      <div class="misc-wrapper"><br><br>
        <h2 class="mb-2 mx-2">Page Not Found :(</h2>
        <p class="mb-4 mx-2">Oops! 😖 The requested URL was not found on this server.</p>
        <a href="index.html" class="btn btn-primary">Back to home</a>
        <div class="mt-3">
          <img
            src="../assets/notFound.png"
            alt="page-error"
            width="500"
            class="img-fluid"            
          />
        </div>
      </div>
    </div>   
    
  </body>

  `,
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
