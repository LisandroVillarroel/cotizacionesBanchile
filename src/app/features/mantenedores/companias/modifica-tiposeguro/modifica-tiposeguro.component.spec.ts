import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaTiposeguroComponent } from './modifica-tiposeguro.component';

describe('ModificaTiposeguroComponent', () => {
  let component: ModificaTiposeguroComponent;
  let fixture: ComponentFixture<ModificaTiposeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaTiposeguroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificaTiposeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
