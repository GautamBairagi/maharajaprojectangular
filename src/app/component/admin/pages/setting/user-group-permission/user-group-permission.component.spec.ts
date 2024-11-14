import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupPermissionComponent } from './user-group-permission.component';

describe('UserGroupPermissionComponent', () => {
  let component: UserGroupPermissionComponent;
  let fixture: ComponentFixture<UserGroupPermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserGroupPermissionComponent]
    });
    fixture = TestBed.createComponent(UserGroupPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
