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



  newEventStartDate: any;
  newEventStartTime: any;
  newEventEndDate: any;
  newEventEndTime: any;
  newEventNotes: string;
  newEventOutsideOrInside: boolean;
  newLocation: string;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private route: ActivatedRoute) { }

  ngOnInit() {

    this.newEventStartDate = {year: 2019, month:8, day: 16}
    this.newEventEndDate = {year:2019, month:8, day: 16}
    this.newLocation = ''
    this.newEventNotes = ''



    this.newEventOutsideOrInside = false;
    const currentDate = new Date();


    this.newEventEndTime = { hour: 3, minute: 30, second: 0 }
    this.newEventStartTime = { hour: 3, minute: 30, second: 0 };

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
    this.db.doc('shops/' + this.shop_id).set(this.currentShop).finally(() => {
      console.log('saved???');
    });
  }

  saveEvent() {


    // " Object { year: 2019, month: 11, day: 15 }\n' +
    // 'shop-edit-and-publish-events.component.ts:90:12\n' +
    // 'Object { hour: 3, minute: 30, second: 0 }\n' +
    // 'shop-edit-and-publish-events.component.ts:91:12\n' +
    // 'Object { year: 2019, month: 11, day: 15 }\n' +
    // 'shop-edit-and-publish-events.component.ts:92:12\n' +
    // 'Object { hour: 7, minute: 30, second: 0 }\n' +
    // 'shop-edit-and-publish-events.component.ts:93:12\n' +
    // 'testt boies shop-edit-and-publish-events.component.ts:94:12\n' +
    // 'Object { year: 2019, month: 11, day: 15 } "
    const theNewEvent = {}
    const startTime = new Date();
    startTime.setFullYear(this.newEventStartDate.year);
    startTime.setMonth(this.newEventStartDate.month-1);
    startTime.setDate(this.newEventStartDate.day);
    startTime.setHours(this.newEventStartTime.hour, this.newEventStartTime.minute);

    const endTime = new Date();
    endTime.setFullYear(this.newEventEndDate.year);
    endTime.setMonth(this.newEventEndDate.month-1);
    endTime.setDate(this.newEventEndDate.day);
    endTime.setHours(this.newEventEndTime.hour, this.newEventEndTime.minute);


    theNewEvent['end_time'] = endTime;
    theNewEvent['start_time'] = startTime;
    if (this.newEventOutsideOrInside) {
      theNewEvent['inside_or_outside'] = 'outside'

    }

    else{
      theNewEvent['inside_or_outside'] = 'inside'
    }

    theNewEvent['notes'] = this.newEventNotes
    theNewEvent['shop_name'] = this.currentShop.name
    theNewEvent['shop_id'] = this.shop_id;
    theNewEvent['twitter'] = this.currentShop.twitter;
    theNewEvent['instagram'] = this.currentShop.instagram;
    theNewEvent['website'] = this.currentShop.website;
    theNewEvent['email'] = this.currentShop.email;
    theNewEvent['location'] = this.newLocation;
    theNewEvent['tags'] = this.currentShop.tags;


    this.db.doc('shop_events/' + this.newEventId() ).set(theNewEvent).finally(() => {
      console.log('saved???');
    });

    console.log('wtf');
    console.log(this.newEventOutsideOrInside);
    console.log('wtff')
  }


  newEventId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}

