import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraficoPieComponent } from './grafico-pie.component';
import { ChartModule } from 'primeng/chart';

describe('GraficoPieComponent', () => {
  let component: GraficoPieComponent;
  let fixture: ComponentFixture<GraficoPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraficoPieComponent],
      imports: [ChartModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
