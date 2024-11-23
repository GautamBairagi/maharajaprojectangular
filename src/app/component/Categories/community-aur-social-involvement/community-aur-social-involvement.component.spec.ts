import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityAurSocialInvolvementComponent } from './community-aur-social-involvement.component';

describe('CommunityAurSocialInvolvementComponent', () => {
  let component: CommunityAurSocialInvolvementComponent;
  let fixture: ComponentFixture<CommunityAurSocialInvolvementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityAurSocialInvolvementComponent]
    });
    fixture = TestBed.createComponent(CommunityAurSocialInvolvementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
