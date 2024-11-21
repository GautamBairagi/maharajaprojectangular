import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineActivityComponent } from './medicine-activity.component';

describe('MedicineActivityComponent', () => {
  let component: MedicineActivityComponent;
  let fixture: ComponentFixture<MedicineActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicineActivityComponent]
    });
    fixture = TestBed.createComponent(MedicineActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
