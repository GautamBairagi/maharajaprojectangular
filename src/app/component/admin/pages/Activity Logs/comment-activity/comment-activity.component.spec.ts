import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentActivityComponent } from './comment-activity.component';

describe('CommentActivityComponent', () => {
  let component: CommentActivityComponent;
  let fixture: ComponentFixture<CommentActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentActivityComponent]
    });
    fixture = TestBed.createComponent(CommentActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
