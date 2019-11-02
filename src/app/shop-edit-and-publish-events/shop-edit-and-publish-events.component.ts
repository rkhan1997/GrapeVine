import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-shop-edit-and-publish-events',
  templateUrl: './shop-edit-and-publish-events.component.html',
  styleUrls: ['./shop-edit-and-publish-events.component.css']
})
export class ShopEditAndPublishEventsComponent implements OnInit {

  currentShop: any;
  newTag:string;
  shop_id: string;
  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private route: ActivatedRoute) { }

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
        this.currentShop = {};
        this.currentShop['name'] = '';
        this.currentShop['twitter'] = '';
        this.currentShop['instagram'] = '';
        this.currentShop['bio'] = '';
        this.currentShop['website'] = '';
        this.currentShop['email'] = '';
        this.currentShop['phone'] = '';
        this.currentShop['tags'] = [];
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
       this.currentShop = {};
       this.currentShop['name'] = '';
       this.currentShop['twitter'] = '';
       this.currentShop['instagram'] = '';
       this.currentShop['bio'] = '';
       this.currentShop['website'] = '';
       this.currentShop['email'] = '';
       this.currentShop['phone'] = '';
       this.currentShop['tags'] = [];
    });
  }


  deleteTag(tagIndex:number) {
    this.currentShop.tags.splice(tagIndex, 1);
  }

  addTag() {
    this.currentShop.tags.push( '' + this.newTag.toString() );
    this.newTag = '';
  }


  saveShop() {
    this.db.doc('shops/' + this.shop_id).set(this.currentShop).finally( () =>
      console.log('saved???'));
    });

  }

