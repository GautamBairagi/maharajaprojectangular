import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomActivityComponent } from './room-activity.component';

describe('RoomActivityComponent', () => {
  let component: RoomActivityComponent;
  let fixture: ComponentFixture<RoomActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomActivityComponent]
    });
    fixture = TestBed.createComponent(RoomActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
