import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newTag: string;
  tagFilter: string[];
  events: Observable<any[]>;
  rightNow: Date;
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.newTag = '';
    this.tagFilter = ['hey', 'whats up']
    this.rightNow = new Date();
    this.events = this.db.collection('shop_events').valueChanges();

  }

  deleteTag(tagIndex:number) {
    this.tagFilter.splice(tagIndex, 1);
  }

  addTag() {
    this.tagFilter.push( '' + this.newTag.toString() );
    this.newTag = '';
  }

}
