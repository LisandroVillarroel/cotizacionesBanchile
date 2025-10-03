import { Component, computed, effect, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IResumenSolicitudes } from '../datosSolicitud-Interface';
//import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-resumen-general',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule
    //, MatGridListModule
  ],
  templateUrl: './resumen-general.component.html',
  styleUrl: './resumen-general.component.css'
})
export class ResumenGeneralComponent {
  datoResumenGeneral =  input.required<IResumenSolicitudes | undefined>();
  /*enProceso = 24;
  enEspera = 12;
  aprobadas = 38;
  conObs = 7;
  */
 //resumenGeneral=signal<IResumenSolicitudes  | undefined>(undefined);
  resumenGeneral=computed(()=> this.datoResumenGeneral());

}
