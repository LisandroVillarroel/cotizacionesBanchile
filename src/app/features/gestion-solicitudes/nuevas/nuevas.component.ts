import { Component, ViewChild, inject, signal, NgModule, computed } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltip, MatTooltipModule } from "@angular/material/tooltip";
import { ISolicitudG} from '@features/gestion-solicitudes/gestionSolicitud-interface';
import DetalleSolicitudComponent from '@features/detalle-solicitud/detalle-solicitud.component';
import { RubroService } from '@shared/service/rubro.service';
import { IRubro, InterfazRubro } from '@shared/modelo/rubro-interface';
import { TipoSeguroService } from '@shared/service/tipo-seguro.service';
import { ITipoSeguro, InterfazTipoSeguro } from '@shared/modelo/tipoSeguro-interface';

@Component({
  selector: 'app-nuevas',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDividerModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './nuevas.component.html',
  styleUrl: './nuevas.component.css'
})

export class NuevasComponent {
  panelOpenState = false;

  rubroService = inject(RubroService);
  datoRubros = signal<IRubro[]>([]);
  rubro = new FormControl();

  tipoSeguroService = inject(TipoSeguroService);
  rescatadoSeguro = signal<ITipoSeguro[]>([]);
  seguro = new FormControl();

  dateControl = new FormControl();

  displayedColumns: string[] = [
    "Sla",
    "ID",
    "Rut",
    "Contratante",
    "Rubro",
    "TipoSeguro",
    "Fecha",
    "accion"
  ];

  dataSolicitud = signal<ISolicitudG[]>([]);
  filtro = signal('');
  pagina = signal(0);
  pageSize = 5;

  /* constructor(private rubroService: RubroService) {
    this.cargarRubros();
  }

  cargarRubros() {
    this.rubroService.postRubro().subscribe(data => {
      // Ajusta según la estructura de tu respuesta
      this.rubros.set(data.listaRubros ?? []);
    });
  } */
   @ViewChild('inContratante') inputElement: any;

   @ViewChild(MatPaginator)
    paginatorSolicitud!: MatPaginator;

  ngAfterViewInit(): void {
    //this.dataSourceSolicitud.paginator = this.paginatorSolicitud;
  }

  private readonly dialog = inject(MatDialog);
  private matPaginatorIntl = inject(MatPaginatorIntl);

  datosFiltrados = computed(() =>
    this.dataSolicitud().filter(r =>
      r.Contratante?.toLowerCase().includes(this.filtro().toLowerCase())
    )
  );

  datosPaginados = computed(() => {
    const start = this.pagina() * this.pageSize;
    return this.datosFiltrados().slice(start, start + this.pageSize);
  });

  onPage(event: any) {
    this.pagina.set(event.pageIndex);
  }

  cargaRubros() {
    this.rubroService.postRubro().subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
           this.datoRubros.set(dato.items);
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

  async seleccionaRubro(_codigoRubro: string) {
    const estructura_codigoRubro = {id_rubro:_codigoRubro} ;
    this.dataSolicitud.set(await this.dataSolicitud().filter((item) => item.IdRubro == _codigoRubro));
    this.tipoSeguroService.postTipoSeguro(estructura_codigoRubro).subscribe({
        next: (dato) => {
          if (dato.codigo === 200) {
            this.rescatadoSeguro.set(dato.items);
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
/*
  filtrarContratante(event: Event) {
    //this.datosFiltrados = computed(() =>
      this.dataSolicitud().filter(r =>
        r.Rubro?.toLowerCase().includes(this.filtro().toLowerCase())
      )
    //);

    this.datosPaginados = computed(() => {
      const start = this.pagina() * this.pageSize;
      return this.datosFiltrados().slice(start, start + this.pageSize);
    });
  } */

  async filtrarTipoSeguro(inTipoSeguro: string) {
    this.dataSolicitud.set(await this.dataSolicitud().filter((item) => item.IdTipoSeguro == inTipoSeguro));
  }

  async filtrarFecha() {
    this.dataSolicitud.set(await this.dataSolicitud()
    .filter((item) => item.Fecha == this.dateControl.value.toString()));
  }

  limpiaFiltros() {
    this.rubro.reset();
    this.seguro.reset();

    this.dataSolicitud.set(this.datosSolicitud);
  }

  async ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por Página';
    this.dataSolicitud.set(this.datosSolicitud);
    //this.dataSourceSolicitud.data = this.datosSolicitud();
    this.cargaRubros();
  }

  getCellClass(value: number): string {
    if(value <= 1){
      return 'verde' ;
    }else if (value <= 2) {
      return 'amarillo';
    }else{
        return 'rojo';
    }
  }

/* Llamadas a servicios */
  datosSolicitud =<ISolicitudG[]>([
    {
      Sla: 1,
      ID: "COT-1243123",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 1",
      IdRubro: "1",
      Rubro: 'AUTOMOTRIZ',
      IdTipoSeguro: "1",
      TipoSeguro: "VEHICULO LIVIANO",
      Fecha: '15/03/2023',
      //Observaciones:[],
      //Companias:[]
    },
    {
      Sla: 1,
      ID: "COT-1243125",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 2",
      IdRubro: "3",
      Rubro: 'VIDA',
      IdTipoSeguro: "1",
      TipoSeguro: "RESPONSABILIDAD CIVIL MEDICA",
      Fecha: '22/07/2023',
      //Observaciones:[],
      //Companias:[]

   },
    {
      Sla: 2,
      ID: "COT-1245723",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 3",
      IdRubro: "3",
      Rubro: 'VIDA',
      IdTipoSeguro: "2",
      TipoSeguro: "VIDA",
      Fecha: '30/09/2023',
      //Observaciones:[],
      //Companias:[]

},
    {
      Sla: 2,
      ID: "COT-1257213",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 4",
      IdRubro: "1",
      Rubro: 'AUTOMOTRIZ',
      IdTipoSeguro: "2",
      TipoSeguro: "VEHICULO PESADO",
      Fecha: '05/12/2023',
      //Observaciones:[],
      //Companias:[]

    },
    {
      Sla: 3,
      ID: "COT-1257216",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 5",
      IdRubro: "2",
      Rubro: 'HOGAR',
      IdTipoSeguro: "1",
      TipoSeguro: "INCENDIO",
      Fecha: '18/02/2023',
      //Observaciones:[],
      //Companias:[]

    },
    {
      Sla: 3,
      ID: "COT-1257226",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 6",
      IdRubro: "3",
      Rubro: 'VIDA',
      IdTipoSeguro: "3",
      TipoSeguro: "SALUD COLECTIVO",
      Fecha: '27/04/2023',
      //Observaciones:[],
      //Companias:[]

    },
    {
      Sla: 3,
      ID: "COT-1257227",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 7",
      IdRubro: "2",
      Rubro: 'HOGAR',
      IdTipoSeguro: "1",
      TipoSeguro: "INCENDIO",
      Fecha: '11/06/2023',
      //Observaciones:[],
      //Companias:[]

    },
    {
      Sla: 1,
      ID: "COT-1243123",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 1",
      IdRubro: "1",
      Rubro: 'AUTOMOTRIZ',
      IdTipoSeguro: "1",
      TipoSeguro: "VEHICULO LIVIANO",
      Fecha: '15/03/2023',
      //Observaciones:[],
      //Companias:[]

    },
    {
      Sla: 1,
      ID: "COT-1243125",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 2",
      IdRubro: "3",
      Rubro: 'VIDA',
      IdTipoSeguro: "1",
      TipoSeguro: "RESPONSABILIDAD CIVIL MEDICA",
      Fecha: '22/07/2023',
      //Observaciones:[],
      //Companias:[]

    },
    {
      Sla: 2,
      ID: "COT-1245723",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 3",
      IdRubro: "3",
      Rubro: 'VIDA',
      IdTipoSeguro: "2",
      TipoSeguro: "VIDA",
      Fecha: '30/09/2023',
      //Observaciones:[],
      //Companias:[]

    },
    {
      Sla: 2,
      ID: "COT-1257213",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 4",
      IdRubro: "1",
      Rubro: 'AUTOMOTRIZ',
      IdTipoSeguro: "3",
      TipoSeguro: "TRANSPORTE TERRESTRE",
      Fecha: '05/12/2023',
      //Observaciones:[],
      //Companias:[]

    },
    {
      Sla: 3,
      ID: "COT-1257216",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 5",
      IdRubro: "4",
      Rubro: 'AGRICOLA',
      IdTipoSeguro: "1",
      TipoSeguro: "AGRICOLA",
      Fecha: '18/02/2023',
      //Observaciones:[],
      //Companias:[]

    },
    {
      Sla: 3,
      ID: "COT-1257226",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 6",
      IdRubro: "3",
      Rubro: 'VIDA',
      IdTipoSeguro: "3",
      TipoSeguro: "SALUD COLECTIVO",
      Fecha: '27/04/2023',
      //Observaciones:[],
      //Companias:[]

    },
    {
      Sla: 3,
      ID: "COT-1257227",
      Rut: "00.000.000-1",
      Contratante: "Nombre Comercial S.A. 7",
      IdRubro: "2",
      Rubro: 'HOGAR',
      IdTipoSeguro: "1",
      TipoSeguro: "INCENDIO",
      Fecha: '11/06/2023',
      //Observaciones:[],
      //Companias:[]

    },
  ]);

 /*  datoRubros = signal<ITipoRubro[]>([
    {
      codigoRubro: 1,
      descripcionRubro: 'Crédito',
    },
    {
      codigoRubro: 2,
      descripcionRubro: 'Inmuebles',
    },
    {
      codigoRubro: 3,
      descripcionRubro: 'AUTOMOTRIZ',
    },
    {
      codigoRubro: 4,
      descripcionRubro: 'VIDA',
    },
  ]);

  DatoSeguros = signal<ITipoSeguro[]>([
    {
      codigoSeguro: 1,
      descripcionSeguro: 'Seguro de Crédito Interno',
      codigoRubro: 1
    },
    {
      codigoSeguro: 1,
      descripcionSeguro: 'Todo Seguro y Construcción',
      codigoRubro: 2
    },
    {
      codigoSeguro: 1,
      descripcionSeguro: 'VEHICULO LIVIANO',
      codigoRubro: 3
    },
    {
      codigoSeguro: 2,
      descripcionSeguro: 'TRANSPORTE TERRESTRE',
      codigoRubro: 3
    },
    {
      codigoSeguro: 1,
      descripcionSeguro: 'ASISTENCIA EN VIAJES',
      codigoRubro: 4
    },
    {
      codigoSeguro: 2,
      descripcionSeguro: 'RESPONSABILIDAD CIVIL MEDICA',
      codigoRubro: 4
    },
    {
      codigoSeguro: 3,
      descripcionSeguro: 'Asiento Pasajero/VIDA Conductor',
      codigoRubro: 4
    },
  ]); */

  verDetalle(IdSolicitud: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top: '3%' };
    dialogConfig.data = IdSolicitud;
    this.dialog
        .open(DetalleSolicitudComponent, dialogConfig)
        .afterClosed()
    }
}
