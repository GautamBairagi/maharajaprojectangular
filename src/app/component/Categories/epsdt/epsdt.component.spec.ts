import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpsdtComponent } from './epsdt.component';

describe('EpsdtComponent', () => {
  let component: EpsdtComponent;
  let fixture: ComponentFixture<EpsdtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpsdtComponent]
    });
    fixture = TestBed.createComponent(EpsdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
