import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ITipoSeguroCompania } from '../compania-Interface';

@Component({
  selector: 'app-listar-tiposeguro',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './listar-tiposeguro.component.html',
  styleUrl: './listar-tiposeguro.component.css',
})
export class ListarTiposeguroComponent {
  @Input() dataSource!: MatTableDataSource<ITipoSeguroCompania>;
  @Input() displayedColumns: string[] = [];
  @Input() tiposSeguro: ITipoSeguroCompania[] = [];
}
