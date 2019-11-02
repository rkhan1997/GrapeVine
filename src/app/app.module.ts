import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FormsModule} from '@angular/forms';
import { ShopProfileComponent } from './shop-profile/shop-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShopEditAndPublishEventsComponent } from './shop-edit-and-publish-events/shop-edit-and-publish-events.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopProfileComponent,
    NavbarComponent,
    ShopEditAndPublishEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
