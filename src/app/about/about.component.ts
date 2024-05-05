import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CountUpModule } from 'ngx-countup';

@Component({
	selector: 'app-about',
	standalone: true,
	imports: [HeaderComponent, FooterComponent, CountUpModule],
	template: `

  <app-header></app-header>
  
  <body> 
	<!-- ##### Heading ##### -->
	<div id="heading">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="heading-content">
						<h2>About</h2>
						<span>Home / <a href="#">About</a></span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ##### Who We Are ##### -->
	<div class="row">
		<div class="col-md-12">
			<div class="heading-section">
				<h2>Who We Are</h2>
				<img src="assets/under-heading.png" alt="" />
			</div>
		</div>
	</div>
	<section>
		<div class="container">
			<div class="row">
				<div class="col-md-10 col-xl-8 offset-xl-2">							
					<div class="title">															
						<h6>
						Online Recipes is a page created from a Rest Api project and later in Angular to take food recipes
						to the Digital World. The concept emerged at the end of 2023, with the appointment of Trainer 
						Rodolfo and	then followed by Trainer Filipe. 
						</h6>
						<h6>
						The idea arises as a means of diversifying the different aspects of programming
						and also the developer's imagination and creativity. 
						</h6>
						<h6>
						This project was created completely out of nothing, having at its disposal the countless tools 
						taught in training over the course of 1 academic year.
						</h6>
						<h6>
						Currently, due to the genius of its creator, Online Recipes has become a global brand, recognized
						in more than 280 countries and used daily by 2 million people.
						</h6>
						<h6>Listed on the New York Stock Market, it currently holds a place on the Forbes top 10.</h6>
					</div>
				</div>
			</div>
		</div>
	</section>
				
	<!-- ##### Awards ##### -->
	<section class="md-section consult-background">
		<div class="container">
			<div class="row">
				<div class="col-lg-10 col-xl-8 offset-0 offset-sm-0 offset-md-0 offset-lg-1 offset-xl-2 ">
					<div class="title-01 title-01__style-04">								
						<div class="heading-section">
							<h2>Awards</h2>
							<img src="assets/break-line.png" alt="" />
						</div>						
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6 col-lg-3 ">						
					<div class="iconbox iconbox__style-03">
						<div class="iconbox__icon"><i class="ti ti-cup"></i></div>								
						<h2 class="iconbox__title"><a href="#">UX Design Awards 2024</a></h2>
						<div class="iconbox__description">
							Nominated for awards that recognize the talent and effort of the world's best web
							designers, developers and agencies.
						</div>								
					</div>
				</div>
				<div class="col-md-6 col-lg-3 ">						
					<div class="iconbox iconbox__style-03">
						<div class="iconbox__icon"><i class="ti ti-crown"></i></div>								
						<h2 class="iconbox__title"><a href="#">Top Brand of the Month</a></h2>
						<div class="iconbox__description">											
							Chosen by consumers as the most used brand in Mar 24.
							Reaching a record number of online searches.
						</div>								
					</div>
				</div>
				<div class="col-md-6 col-lg-3 ">		
					<div class="iconbox iconbox__style-03">
						<div class="iconbox__icon"><i class="ti ti-world"></i></div>					
						<h2 class="iconbox__title"><a href="#">Worldwide Locations</a></h2>
						<div class="iconbox__description">
							Global brand, recognized in more than 280 countries and supported in 16 different languages.
						</div>
					</div>
				</div>		
				<div class="col-md-6 col-lg-3 ">		
					<div class="iconbox iconbox__style-03">
						<div class="iconbox__icon"><i class="ti ti-shine"></i></div>		
						<h2 class="iconbox__title"><a href="#">Environment Friendly Processes</a></h2>
						<div class="iconbox__description">
							Goods and services, laws, guidelines and policies that reduced, minimal ecosystems and the environment.
						</div>
					</div>		
				</div>
			</div>
		</div>
	</section>

	<!-- ##### Numbers ##### -->
	<div class="heading-section">
		<h2>Our Numbers</h2>
		<img src="assets/under-heading.png" alt="" />
	</div>
	<section class="about-area section-padding-80">
		<div class="container">            
			<div class="row">
				<div class="col-12">
					<h6 class="sub-heading pb-5">
					Focused on the objective of having the largest number of varied recipes, whether for meat, 
					fish or vegetable lovers, the creation of recipes by users was implemented and subsequently 
					validated. The current numbers are an effort by everyone who contributed to this project and
					consequently the global sharing of culinary knowledge.	
					</h6>
				</div>
			</div>
			<div class="row align-items-center mt-70">			
				<div class="col-12 col-sm-6 col-lg-3">
					<div class="single-cool-fact">
						<img src="assets/chief.png" alt="">
						<h3><span [countUp]="1287" [options]="{ enableScrollSpy: true }">0</span></h3>
						<h6>Amazing recipes</h6>
					</div>
				</div>			
				<div class="col-12 col-sm-6 col-lg-3">
					<div class="single-cool-fact">
						<img src="assets/vegetarian.png" alt="">
						<h3><span [countUp]="85" [options]="{ enableScrollSpy: true }">0</span></h3>
						<h6>Vegetarian recipes</h6>
					</div>
				</div>			
				<div class="col-12 col-sm-6 col-lg-3">
					<div class="single-cool-fact">
						<img src="assets/meat.png" alt="">
						<h3><span [countUp]="471" [options]="{ enableScrollSpy: true }">0</span></h3>
						<h6>Meat recipes</h6>
					</div>
				</div>			
				<div class="col-12 col-sm-6 col-lg-3">
					<div class="single-cool-fact">
						<img src="assets/fish.png" alt="">
						<h3><span [countUp]="326" [options]="{ enableScrollSpy: true }">0</span></h3>
						<h6>Fish recipes</h6>
					</div>
				</div>
			</div>           
		</div>
	</section>	

	<!-- ##### Our Team ##### -->
	<section>
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="heading-section">
						<h2>Our Team</h2>
						<img src="assets/under-heading.png" alt="" >
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-3 col-sm-6">
					<div class="team-thumb">
						<div class="author">
							<img src="assets/author1.jpg" alt="Tracy - templatemo">
						</div>
						<div class="overlay">
							<div class="author-caption">
								<ul>
									<li><a href="#"><i class="fa fa-facebook"></i></a></li>
									<li><a href="#"><i class="fa fa-twitter"></i></a></li>
									<li><a href="#"><i class="fa fa-linkedin"></i></a></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="author-details">
						<h2>Rick</h2>
						<span>Web Developer</span>
					</div>
				</div>
				<div class="col-md-3 col-sm-6">
					<div class="team-thumb">
						<div class="author">
							<img src="assets/author2.jpg" alt="Mary - templatemo">
						</div>
						<div class="overlay">
							<div class="author-caption">
								<ul>
									<li><a href="#"><i class="fa fa-facebook"></i></a></li>
									<li><a href="#"><i class="fa fa-twitter"></i></a></li>
									<li><a href="#"><i class="fa fa-linkedin"></i></a></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="author-details">
						<h2>Mai-Ling</h2>
						<span>Designer</span>
					</div>
				</div>
				<div class="col-md-3 col-sm-6">
					<div class="team-thumb">
						<div class="author">
							<img src="assets/author3.jpg" alt="Julia - templatemo">
						</div>
						<div class="overlay">
							<div class="author-caption">
								<ul>
									<li><a href="#"><i class="fa fa-facebook"></i></a></li>
									<li><a href="#"><i class="fa fa-twitter"></i></a></li>
									<li><a href="#"><i class="fa fa-linkedin"></i></a></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="author-details">
						<h2>George</h2>
						<span>Software Developer</span>
					</div>
				</div>
				<div class="col-md-3 col-sm-6">
					<div class="team-thumb">
						<div class="author">
							<img src="assets/author4.jpg" alt="Linda - templatemo">
						</div>
						<div class="overlay">
							<div class="author-caption">
								<ul>
									<li><a href="#"><i class="fa fa-facebook"></i></a></li>
									<li><a href="#"><i class="fa fa-twitter"></i></a></li>
									<li><a href="#"><i class="fa fa-linkedin"></i></a></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="author-details">
						<h2>Jane</h2>
						<span>Digital Marketing</span>
					</div>
				</div>
			</div>
		</div>
	</section>	
  </body>

  <app-footer></app-footer>
    
  `,
    styleUrl: './about.component.css',
    
})
export class AboutComponent {

}
