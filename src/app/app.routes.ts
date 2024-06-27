import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path:"",component:LoginComponent,pathMatch:"full"},
    {path:'Login',component:LoginComponent,pathMatch:"full"},
    {path:"pages",loadChildren:()=> import("./Components/layout/layout.module").then(m=> m.LayoutModule)},
    {path:"**",redirectTo:'login',pathMatch:"full"}

];
@NgModule({ 
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
 })
 export class AppRoutingModule {  } 
