import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTasksComponent } from './room-tasks.component';

describe('RoomTasksComponent', () => {
  let component: RoomTasksComponent;
  let fixture: ComponentFixture<RoomTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomTasksComponent]
    });
    fixture = TestBed.createComponent(RoomTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
