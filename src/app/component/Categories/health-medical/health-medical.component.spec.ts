import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthMedicalComponent } from './health-medical.component';

describe('HealthMedicalComponent', () => {
  let component: HealthMedicalComponent;
  let fixture: ComponentFixture<HealthMedicalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthMedicalComponent]
    });
    fixture = TestBed.createComponent(HealthMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
