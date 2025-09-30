/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerAseguradosComponent } from './ver-asegurados.component';

describe('VerAseguradosComponent', () => {
  let component: VerAseguradosComponent;
  let fixture: ComponentFixture<VerAseguradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerAseguradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAseguradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
