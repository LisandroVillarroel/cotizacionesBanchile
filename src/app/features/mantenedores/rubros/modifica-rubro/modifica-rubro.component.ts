import { Component, inject } from '@angular/core';
import CabeceraPopupComponente from "../../../../shared/ui/cabeceraPopup.component";
import { MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { IRubro } from '../rubros-interface';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modifica-rubro',
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
  templateUrl: './modifica-rubro.component.html',
  styleUrl: './modifica-rubro.component.css'
})
export class ModificaRubroComponent {
private readonly dialogRef = inject(MatDialogRef<ModificaRubroComponent>);
  public readonly data = inject<IRubro>(MAT_DIALOG_DATA);
}
