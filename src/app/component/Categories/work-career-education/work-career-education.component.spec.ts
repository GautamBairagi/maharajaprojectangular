import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCareerEducationComponent } from './work-career-education.component';

describe('WorkCareerEducationComponent', () => {
  let component: WorkCareerEducationComponent;
  let fixture: ComponentFixture<WorkCareerEducationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkCareerEducationComponent]
    });
    fixture = TestBed.createComponent(WorkCareerEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
