import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAurEmotionalGrowthComponent } from './personal-aur-emotional-growth.component';

describe('PersonalAurEmotionalGrowthComponent', () => {
  let component: PersonalAurEmotionalGrowthComponent;
  let fixture: ComponentFixture<PersonalAurEmotionalGrowthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalAurEmotionalGrowthComponent]
    });
    fixture = TestBed.createComponent(PersonalAurEmotionalGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
