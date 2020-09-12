import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from 'src/app/main-page/main-page.component';
import { AboutPageComponent } from 'src/app/about-page/about-page.component';


const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'about', component: AboutPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
