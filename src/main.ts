/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/Routes/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { tokenInterceptor } from './app/interceptors/token.interceptor';
import { HomeComponent } from './app/Components/home/home.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig), 
    provideHttpClient(withInterceptors([tokenInterceptor])), 
    provideToastr({closeButton:true}), 
    provideAnimationsAsync(), 
    provideAnimationsAsync(),
    HomeComponent
  ]
}).catch((err) => console.error(err));
