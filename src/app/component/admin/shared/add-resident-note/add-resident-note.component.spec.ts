import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResidentNoteComponent } from './add-resident-note.component';

describe('AddResidentNoteComponent', () => {
  let component: AddResidentNoteComponent;
  let fixture: ComponentFixture<AddResidentNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddResidentNoteComponent]
    });
    fixture = TestBed.createComponent(AddResidentNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
