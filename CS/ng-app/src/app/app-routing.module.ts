import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { MainDetailedComponent } from './main-detailed/main-detailed.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'main',
    component:MainComponent
  },
  {
    path: 'about',
    component:AboutComponent
  },
  {
    path:'main/:id',
    component:MainDetailedComponent
  },
  {
    path:'login',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
