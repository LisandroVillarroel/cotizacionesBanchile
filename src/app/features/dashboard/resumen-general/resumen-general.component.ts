import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-resumen-general',
  standalone: true,
  imports: [
    MatDivider,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatHint,
    MatDatepickerModule,
    MatCardModule],
  templateUrl: './resumen-general.component.html',
  styleUrl: './resumen-general.component.css'
})
export class ResumenGeneralComponent {
  enProceso = 24;
  enEspera = 12;
  aprobadas = 38;
  conObs = 7;
}
