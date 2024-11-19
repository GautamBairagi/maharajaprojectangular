import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedesComponent } from './add-medes.component';

describe('AddMedesComponent', () => {
  let component: AddMedesComponent;
  let fixture: ComponentFixture<AddMedesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMedesComponent]
    });
    fixture = TestBed.createComponent(AddMedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
