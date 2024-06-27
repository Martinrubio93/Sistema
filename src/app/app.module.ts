import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { SharedModule } from './Reutilizable/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule} from "@angular/material/form-field";
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
     MatIconModule,
   SharedModule,
   RouterModule,
   MatFormFieldModule,
   MatInputModule
    
  ],
  exports: [ MatFormFieldModule, MatInputModule ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
   provideHttpClient()
  
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


  
 }
  