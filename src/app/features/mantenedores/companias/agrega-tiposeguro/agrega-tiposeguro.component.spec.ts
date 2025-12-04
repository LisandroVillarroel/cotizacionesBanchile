import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaTiposeguroComponent } from './agrega-tiposeguro.component';

describe('AgregaTiposeguroComponent', () => {
  let component: AgregaTiposeguroComponent;
  let fixture: ComponentFixture<AgregaTiposeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregaTiposeguroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregaTiposeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
