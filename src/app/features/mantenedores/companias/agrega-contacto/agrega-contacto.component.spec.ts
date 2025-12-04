import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaContactoComponent } from './agrega-contacto.component';

describe('AgregaContactoComponent', () => {
  let component: AgregaContactoComponent;
  let fixture: ComponentFixture<AgregaContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregaContactoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregaContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
