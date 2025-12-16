import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

import { CompaniaService } from '../compania.service';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { IContactoCompaniaCrear } from '../compania-Interface';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-agrega-contacto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CabeceraPopupComponente,
  ],
  templateUrl: './agrega-contacto.component.html',
  styleUrls: ['./agrega-contacto.component.css'],
})
export class AgregaContactoComponent {
  private companiaService = inject(CompaniaService);
  private notificacioAlertnService = inject(NotificacioAlertnService);
  private dialogRef = inject(MatDialogRef<AgregaContactoComponent>);
  private data = inject(MAT_DIALOG_DATA);

  nombreContacto = new FormControl('', [Validators.required]);
  correoContacto = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  ]);

  agregaContacto = signal<FormGroup>(
    new FormGroup({
      nombreContacto: this.nombreContacto,
      correoContacto: this.correoContacto,
    })
  );

  getErrorMessage(campo: string): string {
    if (campo === 'nombreContacto') {
      this.nombreContacto.hasError('required') ? 'Debes ingresar Nombre' : '';
    }
    if (campo === 'correoContacto') {
      if (this.correoContacto.hasError('required')) {
        return 'Debes ingresar Correo';
      }
      if (this.correoContacto.hasError('pattern')) {
        return 'Correo inválido';
      }
    }
    return '';
  }

  grabar(): void {
    const payload: IContactoCompaniaCrear = {
      p_id_usuario: 'adm001',
      p_tipo_usuario: 'A',
      p_id_compania_seguro: this.data.idCompania,
      p_nombre_ejecutivo_cia:
        this.agregaContacto().get('nombreContacto')!.value,
      p_correo_ejecutivo_cia:
        this.agregaContacto().get('correoContacto')!.value,
    };

    this.companiaService.postAgregaContactoCompania(payload).subscribe({
      next: (resp) => {
        if (resp.codigo === 200) {
          this.notificacioAlertnService.success(
            'Éxito',
            'Contacto creado correctamente'
          );
          this.dialogRef.close('agregado');
        } else {
          this.notificacioAlertnService.error('ERROR', resp.mensaje);
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'Error inesperado');
      },
    });
  }
}
