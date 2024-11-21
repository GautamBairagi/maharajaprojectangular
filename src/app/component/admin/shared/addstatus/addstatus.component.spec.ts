import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstatusComponent } from './addstatus.component';

describe('AddstatusComponent', () => {
  let component: AddstatusComponent;
  let fixture: ComponentFixture<AddstatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddstatusComponent]
    });
    fixture = TestBed.createComponent(AddstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
