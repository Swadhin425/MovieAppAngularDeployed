/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SinglyCommentComponent } from './singly-comment.component';

describe('SinglyCommentComponent', () => {
  let component: SinglyCommentComponent;
  let fixture: ComponentFixture<SinglyCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglyCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglyCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
