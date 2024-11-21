import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyActivityComponent } from './frequency-activity.component';

describe('FrequencyActivityComponent', () => {
  let component: FrequencyActivityComponent;
  let fixture: ComponentFixture<FrequencyActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrequencyActivityComponent]
    });
    fixture = TestBed.createComponent(FrequencyActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
