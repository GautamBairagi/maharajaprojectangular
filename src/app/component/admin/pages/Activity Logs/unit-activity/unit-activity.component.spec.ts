import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitActivityComponent } from './unit-activity.component';

describe('UnitActivityComponent', () => {
  let component: UnitActivityComponent;
  let fixture: ComponentFixture<UnitActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitActivityComponent]
    });
    fixture = TestBed.createComponent(UnitActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
