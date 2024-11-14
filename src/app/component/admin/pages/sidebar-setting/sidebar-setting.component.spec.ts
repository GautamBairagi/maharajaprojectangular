import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSettingComponent } from './sidebar-setting.component';

describe('SidebarSettingComponent', () => {
  let component: SidebarSettingComponent;
  let fixture: ComponentFixture<SidebarSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarSettingComponent]
    });
    fixture = TestBed.createComponent(SidebarSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
