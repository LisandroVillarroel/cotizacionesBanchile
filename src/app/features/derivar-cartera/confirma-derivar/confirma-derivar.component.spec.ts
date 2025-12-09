/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaDerivarComponent } from './confirma-derivar.component';

describe('ConfirmaDerivarComponent', () => {
  let component: ConfirmaDerivarComponent;
  let fixture: ComponentFixture<ConfirmaDerivarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmaDerivarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmaDerivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
