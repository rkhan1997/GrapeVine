import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ShopProfileComponent} from './shop-profile/shop-profile.component';

const routes: Routes = [
  {path: '', component:
    HomeComponent},
  {path:'shop_profile', component:
  ShopProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
