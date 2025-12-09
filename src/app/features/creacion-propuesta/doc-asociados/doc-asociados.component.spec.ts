import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAsociadosComponent } from './doc-asociados.component';

describe('DocAsociadosComponent', () => {
  let component: DocAsociadosComponent;
  let fixture: ComponentFixture<DocAsociadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocAsociadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
