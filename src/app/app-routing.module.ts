import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ShopProfileComponent} from './shop-profile/shop-profile.component';
import {ShopEditAndPublishEventsComponent} from './shop-edit-and-publish-events/shop-edit-and-publish-events.component';

const routes: Routes = [
  {path: '', component:
    HomeComponent},
  {path:'shop_profile/:shop_id', component:
  ShopProfileComponent},
  {path: 'shop_settings/:shop_id', component: ShopEditAndPublishEventsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
