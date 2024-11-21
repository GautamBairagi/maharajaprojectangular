import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingActivityComponent } from './setting-activity.component';

describe('SettingActivityComponent', () => {
  let component: SettingActivityComponent;
  let fixture: ComponentFixture<SettingActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingActivityComponent]
    });
    fixture = TestBed.createComponent(SettingActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
