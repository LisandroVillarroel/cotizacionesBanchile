import { IListadoSolicitudes } from './../datosSolicitud-Interface';
import { IResumenSolicitudes } from '@features/dashboard/datosSolicitud-Interface';
import { Component, computed, input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl,ReactiveFormsModule } from '@angular/forms'; // ✅ Necesario para ngModel

// Angular Material
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

// PrimeNG
import { ChartModule } from 'primeng/chart';

// Componentes personalizados
import { GraficoPieComponent } from './grafico-pie/grafico-pie.component';
import { GraficoBarraComponent } from './grafico-barra/grafico-barra.component';

import { RubroService } from '@shared/service/rubro.service';
import { IRubro } from '@shared/modelo/rubro-interface';
import { TipoSeguroService } from '@shared/service/tipo-seguro.service';
import { ITipoSeguro } from '@shared/modelo/tipoSeguro-interface';


@Component({
  selector: 'app-distribucion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // ✅ Agregado para que ngModel funcione
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatOptionModule,
    ChartModule,
    GraficoPieComponent,
    GraficoBarraComponent,
    MatFormField,
    MatLabel,
    MatSelectModule,
    MatSelect,ReactiveFormsModule
],
  templateUrl: './distribucion.component.html',
  styleUrls: ['./distribucion.component.css'] // ✅ Corrección: debe ser "styleUrls" (plural)
})



export default class DistribucionComponent {
listadoSolicitudesGrafiico = input.required<IListadoSolicitudes[]>();
resumenGeneral= computed(() => this.listadoSolicitudesGrafiico());
resumenGeneral_Rubro =signal<IListadoSolicitudes[]>([]);

rubroService = inject(RubroService);
tipoSeguroService = inject(TipoSeguroService);

datoRubros = signal<IRubro[]>([]);
rescatadoSeguro = signal<ITipoSeguro[]>([]);

panelOpenState = false;
  rubro = new FormControl();
  seguro = new FormControl();



// opciones = [
//     { id: 1, nombre: 'Automotriz' },
//     { id: 2, nombre: 'Hogar' },
//     { id: 3, nombre: 'Vida' }
//   ];
//   seleccionada = null;

  constructor(){

  }


  cargaRubros() {
    //console.log('Entro cargaRubros');

    this.rubroService.postRubro().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.datoRubros.set(dato.p_cursor);
        } else {
          if (dato.codigo != 500) {
            console.log('Error:',dato.mensaje);
          } else {
            console.log('ERROR DE SISTEMA:');
          }
        }
      },
      error: (error) => {
        console.log('ERROR INESPERADO', error);
      },
    });
  }




 seleccionaRubro(_codigoRubro: number) {
this.resumenGeneral_Rubro.set(this.resumenGeneral()?.filter(valor=>valor.id_rubro==_codigoRubro));
console.log('resumenGeneral()1111',this.resumenGeneral_Rubro())
  }

async ngOnInit() {
this.resumenGeneral_Rubro.set(this.resumenGeneral())
    this.cargaRubros();
    //this.cargaEstados();
    console.log('resumenGeneral()',this.resumenGeneral())
  }

}






