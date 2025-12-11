import { Component, inject } from '@angular/core';
import CabeceraPopupComponente from "../../../../shared/ui/cabeceraPopup.component";
import { MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { IRubroLista } from '../rubros-interface';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-consulta-rubro',
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
  templateUrl: './consulta-rubro.component.html',
  styleUrl: './consulta-rubro.component.css',
})
export class ConsultaRubroComponent {
  private readonly dialogRef = inject(MatDialogRef<ConsultaRubroComponent>);
  public readonly data = inject<IRubroLista>(MAT_DIALOG_DATA);
}
