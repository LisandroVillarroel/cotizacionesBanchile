import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatLabel } from "@angular/material/form-field";
import { MatIconButton } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { MatCardActions } from "@angular/material/card";
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';

@Component({
  selector: 'app-confirmacion-ppta',
  standalone: true,
  imports: [MatIcon, MatLabel, MatIconButton, MatDialogClose, MatButton, MatButtonModule, MatCardActions,CabeceraPopupComponente],
  templateUrl: './confirmacion-ppta.component.html',
  styleUrl: './confirmacion-ppta.component.css'
})
export class ConfirmacionPptaComponent {

}
