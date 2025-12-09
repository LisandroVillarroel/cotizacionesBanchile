/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompaniasContactadasComponent } from './companias-contactadas.component';

describe('CompaniasContactadasComponent', () => {
  let component: CompaniasContactadasComponent;
  let fixture: ComponentFixture<CompaniasContactadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompaniasContactadasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniasContactadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
