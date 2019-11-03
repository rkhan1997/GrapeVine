import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-shop-profile',
  templateUrl: './shop-profile.component.html',
  styleUrls: ['./shop-profile.component.css']
})
export class ShopProfileComponent implements OnInit {

  currentShop: any;
  shop_id: string;
  eventsByShopOwner: Observable<any[]>;
  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.shop_id = this.route.snapshot.paramMap.get("shop_id");

    this.auth.user.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
      } else {
        console.log('user not logged in');
      }
    });
    // this.currentShop = this.db.doc('/shops/Hu2dKbERBgwq2jMCxdj6').get()


      this.db.doc('shops/' + this.shop_id).ref.get().then((doc) => {
        if (doc.exists) {
          this.currentShop = doc.data();
          console.log("Document data:", doc.data());
        } else {
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });


      this.eventsByShopOwner = this.db.collection('shop_events', ref => ref.where('shop_id', '==', this.shop_id)).valueChanges();
  }

}
