import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ICompaniaSeguro } from '../compania-Interface';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-compania',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatRadioButton,
    MatRadioModule,
    FormsModule,
  ],
  templateUrl: './listar-compania.component.html',
  styleUrl: './listar-compania.component.css',
})
export class ListarCompaniaComponent {
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() displayedColumns: string[] = [];
  @Input() datoCompanias: ICompaniaSeguro[] = [];

  @Output() companiaSeleccionada = new EventEmitter<number>();
  selectedCompaniaId: number | null = null;
  @Output() agregarCompania = new EventEmitter<void>();
  @Output() modificarCompania = new EventEmitter<ICompaniaSeguro>();

  onCompaniaChange(idCompania: number) {
    this.selectedCompaniaId = idCompania;
    this.companiaSeleccionada.emit(idCompania);
  }

  onAgregarCompania() {
    this.agregarCompania.emit();
  }

  onModificarCompania(row: ICompaniaSeguro) {
  this.modificarCompania.emit(row);
}
}
