import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaContactoComponent } from './modifica-contacto.component';

describe('ModificaContactoComponent', () => {
  let component: ModificaContactoComponent;
  let fixture: ComponentFixture<ModificaContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaContactoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificaContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
