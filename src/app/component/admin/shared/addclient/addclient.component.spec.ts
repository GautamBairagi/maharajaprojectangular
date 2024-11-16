import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclientComponent } from './addclient.component';

describe('AddclientComponent', () => {
  let component: AddclientComponent;
  let fixture: ComponentFixture<AddclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddclientComponent]
    });
    fixture = TestBed.createComponent(AddclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
