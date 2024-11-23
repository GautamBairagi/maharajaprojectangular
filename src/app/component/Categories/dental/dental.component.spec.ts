import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentalComponent } from './dental.component';

describe('DentalComponent', () => {
  let component: DentalComponent;
  let fixture: ComponentFixture<DentalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DentalComponent]
    });
    fixture = TestBed.createComponent(DentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
