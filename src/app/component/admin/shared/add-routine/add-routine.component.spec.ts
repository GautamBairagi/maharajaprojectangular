import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoutineComponent } from './add-routine.component';

describe('AddRoutineComponent', () => {
  let component: AddRoutineComponent;
  let fixture: ComponentFixture<AddRoutineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRoutineComponent]
    });
    fixture = TestBed.createComponent(AddRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
