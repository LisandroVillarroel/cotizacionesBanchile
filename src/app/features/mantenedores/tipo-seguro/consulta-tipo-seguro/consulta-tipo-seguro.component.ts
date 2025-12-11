import { Component, inject } from '@angular/core';
import CabeceraPopupComponente from "../../../../shared/ui/cabeceraPopup.component";
import { MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ITipoSeguroLista } from '../tipo-seguro-interface';

@Component({
  selector: 'app-consulta-tipo-seguro',
  standalone: true,
  imports: [
    CabeceraPopupComponente,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatDialogActions,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    CabeceraPopupComponente],
  templateUrl: './consulta-tipo-seguro.component.html',
  styleUrl: './consulta-tipo-seguro.component.css',
})
export class ConsultaTipoSeguroComponent {
  private readonly dialogRef = inject(MatDialogRef<ConsultaTipoSeguroComponent>);
  public readonly data = inject<ITipoSeguroLista>(MAT_DIALOG_DATA);
}
