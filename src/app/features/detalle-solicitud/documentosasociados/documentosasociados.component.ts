import { Component, input, OnInit } from '@angular/core';
import { DocumentosAsociadosService } from './documentosasociados.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from "@angular/material/tooltip";

@Component({
  selector: 'app-documentos-asociados',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatIcon,
    MatIconButton,
    MatTooltip
],
  templateUrl: './documentosasociados.component.html',
  styleUrls: ['./documentosasociados.component.css']
})
export class DocumentosAsociadosComponent implements OnInit {
  idSolicitud = input.required<string>();
  registros: any[] = [];

  constructor(private documentosService: DocumentosAsociadosService) {}

  ngOnInit(): void {
    this.registros = this.documentosService.obtenerRegistrosConDocumentos();
  }
}
