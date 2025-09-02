import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';
import {
  ISolicitudContratante,
  ITipoRubro,
  ITipoSeguro,
} from '../modelo/ingreso-solicitud';

@Component({
  selector: 'app-contratante',
  standalone: true,
  templateUrl: './contratante.component.html',
  styleUrls: ['./contratante.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class ContratanteComponent {}
