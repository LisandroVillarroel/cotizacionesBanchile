import { Component, input } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogClose } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-cabecera-popup',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatDialogClose, MatIcon, MatIconButton],
  template: `
    <div
      class="barra-titulo card-con-titulo titulomodal d-flex"
      style="width: 100%; padding: 0px 0px 0px 0px !important;"
    >
      <h2 style="margin: 0px 0 0px;">&nbsp; {{ titulo() }}</h2>
      <button
        mat-icon-button
        mat-dialog-close
        [disabled]="false"
        style="align-content: center; padding: 0px 0px 0px; height: 30px; align-self: flex-start;"
      >
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `,
  styles: `

    `,
})
export default class CabeceraPopupComponent {
  titulo = input.required<string>();
}
