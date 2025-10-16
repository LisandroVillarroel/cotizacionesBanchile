import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionPptaComponent } from './confirmacion-ppta.component';

describe('ConfirmacionPptaComponent', () => {
  let component: ConfirmacionPptaComponent;
  let fixture: ComponentFixture<ConfirmacionPptaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacionPptaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmacionPptaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
