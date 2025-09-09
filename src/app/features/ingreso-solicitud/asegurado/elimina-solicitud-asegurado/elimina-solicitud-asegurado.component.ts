import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ISolicitudAsegurado } from '@shared/modelo/ingreso-solicitud';

@Component({
  selector: 'app-elimina-solicitud-asegurado',
  standalone: true,
  imports: [ MatFormFieldModule,
  ReactiveFormsModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatButtonModule,],
  templateUrl: './elimina-solicitud-asegurado.component.html',
  styleUrl: './elimina-solicitud-asegurado.component.css'
})
export class EliminaSolicitudAseguradoComponent {
  private readonly dialogRef = inject(MatDialogRef<EliminaSolicitudAseguradoComponent>);
  public readonly data = inject<ISolicitudAsegurado>(MAT_DIALOG_DATA);

  eliminar(){
    this.dialogRef.close(1);
  }
}
