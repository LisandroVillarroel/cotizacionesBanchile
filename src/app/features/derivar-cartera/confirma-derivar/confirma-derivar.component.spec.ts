/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConfirmaDerivarComponent } from './confirma-derivar.component';

describe('ConfirmaDerivarComponent', () => {
  let component: ConfirmaDerivarComponent;
  let fixture: ComponentFixture<ConfirmaDerivarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmaDerivarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmaDerivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
