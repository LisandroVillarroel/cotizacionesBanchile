import { Component, computed, input, signal } from '@angular/core';
import { MatCard, MatCardHeader, MatCardContent } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { ISolicitud } from '@features/detalle-solicitud/modelo/detalle-interface';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-informacion-general',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
],
  templateUrl: './informacion-general.component.html',
  styleUrl: './informacion-general.component.css'
})
export class InformacionGeneralComponent {
  infoGral = input.required<ISolicitud | undefined>();
  infoSolicitud = computed(()=> this.infoGral());
}
