import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusActivityComponent } from './status-activity.component';

describe('StatusActivityComponent', () => {
  let component: StatusActivityComponent;
  let fixture: ComponentFixture<StatusActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusActivityComponent]
    });
    fixture = TestBed.createComponent(StatusActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
