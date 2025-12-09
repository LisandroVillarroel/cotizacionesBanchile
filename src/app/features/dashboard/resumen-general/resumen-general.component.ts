import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IResumenSolicitudes } from '../datosSolicitud-Interface';

@Component({
  selector: 'app-resumen-general',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatCardModule],
  templateUrl: './resumen-general.component.html',
  styleUrl: './resumen-general.component.css',
})
export class ResumenGeneralComponent {
  datoResumenGeneral = input.required<IResumenSolicitudes | undefined>();
  resumenGeneral = computed(() => this.datoResumenGeneral());
}
