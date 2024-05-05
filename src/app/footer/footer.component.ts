import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `

  <body>
    <footer>
      <div class="container">
        <div class="main-footer">
          <div class="row">          
            <div class="col-md-3">
              <div class="quick-links">
                <h4 class="footer-title">Quick Links</h4>
                <ul>
                  <li><a href="#"><i class="fa fa-angle-right"></i>Frequently Asked Questions</a></li>
                  <li><a href="#"><i class="fa fa-angle-right"></i>Privacy Policy</a></li>
                  <li><a href="#"><i class="fa fa-angle-right"></i>News and Updates</a></li>
                  <li><a href="#"><i class="fa fa-angle-right"></i>Technical Support</a></li>
                  <li><a href="#"><i class="fa fa-angle-right"></i>Become our Partener</a></li>
                  <li><a href="#"><i class="fa fa-angle-right"></i>FAQs</a></li>
                </ul>
              </div>
            </div>          
            <div class="col-md-4">
              <div class="more-info">
                <h4 class="footer-title">Information</h4>
                <p>Online Recipes is a project exclusively developed for the Code Devoleper Academy.</p>
                <ul>
                  <li><i class="fa fa-phone"></i>123-456-789</li>
                  <li><i class="fa fa-globe"></i>456 Home Made Studios, Unknown Street, Lisbon</li>
                  <li><i class="fa fa-envelope"></i><a href="#">homemade&#64;company.com</a></li>
                </ul>
              </div>
            </div>  
            <div class="col-md-4">
              <div class="social-bottom">
                <span>Follow us:</span>
                <ul>
                  <li><a href="#" class="fa fa-facebook"></a></li>
                  <li><a href="#" class="fa fa-instagram"></a></li>
                  <li><a href="#" class="fa fa-twitter"></a></li>
                  <li><a href="#" class="fa fa-rss"></a></li>
                </ul>
              </div>          
              <div class="subscribe-form">
                <span>Newsletter</span>
                <form method="get" class="subscribeForm">
                  <input id="subscribe" type="text" />
                  <input type="submit" id="submitButton" />
                </form>
              </div>
            </div>
          </div>
        </div>      
        <div class="bottom-footer">
          <span>Copyright © 2024 <a href="#">Home Made Compnay</a> 
          | Design: <a rel="nofollow" href="#" target="_parent"><span class="blue">Team</span><span class="green">Skywalker</span></a></span>        
        </div>
      </div>
    </footer>
  </body>
  
  `,
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
