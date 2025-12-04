import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IContactoCompania } from '../compania-Interface';

@Component({
  selector: 'app-listar-contacto',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './listar-contacto.component.html',
  styleUrl: './listar-contacto.component.css',
})
export class ListarContactoComponent {
  @Input() dataSource!: MatTableDataSource<IContactoCompania>;
  @Input() displayedColumns: string[] = [];
  @Input() contactos: IContactoCompania[] = [];

  @Output() agregarContacto = new EventEmitter<void>();

  onAgregarContacto() {
    this.agregarContacto.emit();
  }
}
