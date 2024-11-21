import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneActivityComponent } from './milestone-activity.component';

describe('MilestoneActivityComponent', () => {
  let component: MilestoneActivityComponent;
  let fixture: ComponentFixture<MilestoneActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MilestoneActivityComponent]
    });
    fixture = TestBed.createComponent(MilestoneActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
