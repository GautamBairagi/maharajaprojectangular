import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentProvidersComponent } from './current-providers.component';

describe('CurrentProvidersComponent', () => {
  let component: CurrentProvidersComponent;
  let fixture: ComponentFixture<CurrentProvidersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentProvidersComponent]
    });
    fixture = TestBed.createComponent(CurrentProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
