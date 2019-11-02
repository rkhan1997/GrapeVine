import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-shop-profile',
  templateUrl: './shop-profile.component.html',
  styleUrls: ['./shop-profile.component.css']
})
export class ShopProfileComponent implements OnInit {

  currentShop: any;
  constructor(private db: AngularFirestore, private auth: AngularFireAuth) { }

  ngOnInit() {



    this.auth.user.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
      } else {
        console.log('user not logged in');
      }
    });
    // this.currentShop = this.db.doc('/shops/Hu2dKbERBgwq2jMCxdj6').get()


      this.db.doc('shops/Hu2dKbERBgwq2jMCxdj6').ref.get().then((doc) => {
        if (doc.exists) {
          this.currentShop = doc.data();
          console.log("Document data:", doc.data());
        } else {
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
  }

}
