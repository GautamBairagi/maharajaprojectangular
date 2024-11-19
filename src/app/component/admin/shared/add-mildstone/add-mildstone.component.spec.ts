import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMildstoneComponent } from './add-mildstone.component';

describe('AddMildstoneComponent', () => {
  let component: AddMildstoneComponent;
  let fixture: ComponentFixture<AddMildstoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMildstoneComponent]
    });
    fixture = TestBed.createComponent(AddMildstoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
