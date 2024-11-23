import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfCareComponent } from './self-care.component';

describe('SelfCareComponent', () => {
  let component: SelfCareComponent;
  let fixture: ComponentFixture<SelfCareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelfCareComponent]
    });
    fixture = TestBed.createComponent(SelfCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
