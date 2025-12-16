import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTiposeguroComponent } from './listar-tiposeguro.component';

describe('ListarTiposeguroComponent', () => {
  let component: ListarTiposeguroComponent;
  let fixture: ComponentFixture<ListarTiposeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarTiposeguroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarTiposeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
