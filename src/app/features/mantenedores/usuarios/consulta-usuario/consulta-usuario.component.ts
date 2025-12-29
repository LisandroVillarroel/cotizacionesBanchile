import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { StorageService } from '@shared/service/storage.service';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { IUsuario, IUsuarioLista } from '../usuario-Interface';
import { UsuarioService } from '../usuario.service';
import { cleanRut, formatRut, RutFormat, validateRut } from '@fdograph/rut-utilities';

@Component({
  selector: 'app-consulta-usuario',
  standalone: true,
  imports: [CommonModule,
          MatFormFieldModule,
          ReactiveFormsModule,
          MatInputModule,
          MatDialogModule,
          MatButtonModule,
          MatSelectModule,
          CabeceraPopupComponente],
  templateUrl: './consulta-usuario.component.html',
   styles: `
    .mat-mdc-form-field {
    width: 50% !important;
    padding-bottom: 25px;
    padding-right: 10px;
  }
  `
})
export class ConsultaUsuarioComponent {

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  notificacioAlertnService = inject(NotificacioAlertnService);

  private readonly dialogRef = inject(MatDialogRef<ConsultaUsuarioComponent>);
  public readonly data = inject(MAT_DIALOG_DATA);

  usuarioService = inject(UsuarioService);

  dependencia = signal<IUsuarioLista[]>([]);

  usuario!: IUsuario;


  dependenciaUsuario = new FormControl(this.data.p_id_dependencia_usuario, [Validators.required]);

  ngOnInit() {
    console.log("Consulta Usuario ",this.data);
  }

  consultaUsuario = signal<FormGroup>(
    new FormGroup({
      dependenciaUsuario: this.dependenciaUsuario,
    })
  );

  getErrorMessage(campo: string) {
    if (campo === 'dependenciaUsuarioNuevo') {
      return this.dependenciaUsuario.hasError('required')
        ? 'Debes seleccionar Dependencia'
        : '';
    }
    return '';
  }
}
