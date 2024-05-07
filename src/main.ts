/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/Routes/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig), provideHttpClient(), provideToastr({closeButton:true}), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync()
  ]
}).catch((err) => console.error(err));
