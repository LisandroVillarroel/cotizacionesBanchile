import { Component, inject, signal, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CompaniaService } from '../compania.service';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { ITipoSeguroCompania } from '../compania-Interface';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-consulta-compania',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './consulta-compania.component.html',
  styleUrls: ['./consulta-compania.component.css'],
})
export class ConsultaCompaniaComponent implements OnInit {
  private companiaService = inject(CompaniaService);
  private notificacioAlertnService = inject(NotificacioAlertnService);
  public readonly data = inject(MAT_DIALOG_DATA);

  @ViewChild('myPaginator') myPaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listaTiposSeguros = signal<ITipoSeguroCompania[]>([]);

  displayedColumns: string[] = [
    'index',
    'id_rubro',
    'id_tipo_seguro',
    'estado_tipo_seguro',
    'fecha_creacion',
    'usuario_creacion',
    'fecha_modificacion',
    'usuario_modificacion',
    'opciones',
  ];

  ngOnInit() {
    const payload = {
      p_id_usuario: 'ADM042', // temporal, igual que en grabar()
      p_tipo_usuario: 'A',
      p_id_compania_seguro: this.data?.id_compania_seguro ?? 0, // validación por si viene undefined
    };

    console.log('Payload enviado:', payload);

    this.companiaService.postListadoTipoSeguroCompania(payload).subscribe({
      next: (resp) => {
        if (resp.codigo === 200) {
          this.listaTiposSeguros.set(resp.c_TipoSeguroCompania);
        } else {
          this.notificacioAlertnService.error('ERROR', resp.mensaje);
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'Error inesperado');
      },
    });
  }

  getRowIndex(i: number): number {
    if (!this.myPaginator) return i + 1;
    return i + 1 + this.myPaginator.pageIndex * this.myPaginator.pageSize;
  }
}
