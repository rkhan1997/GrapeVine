import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopEditAndPublishEventsComponent } from './shop-edit-and-publish-events.component';

describe('ShopEditAndPublishEventsComponent', () => {
  let component: ShopEditAndPublishEventsComponent;
  let fixture: ComponentFixture<ShopEditAndPublishEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopEditAndPublishEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopEditAndPublishEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
