import { Component, inject, signal } from '@angular/core';
import CabeceraPopupComponente from '../../../../shared/ui/cabeceraPopup.component';
import {
  MatDialogContent,
  MatDialogActions,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField, MatLabel, MatError, MatFormFieldModule } from '@angular/material/form-field';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { AseguradoService } from '@features/ingreso-solicitud/service/asegurado.service';
import { IAsegurado } from '@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { IRubro, IRubroLista } from '../rubros-interface';
import { RubrosService } from '../rubros.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agrega-rubro',
  standalone: true,
  imports: [
    CabeceraPopupComponente,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatDialogActions,
    MatError,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatOption,
    MatSelectModule,
    CommonModule],
  templateUrl: './agrega-rubro.component.html',
  styleUrl: './agrega-rubro.component.css',
})
export class AgregaRubroComponent {
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  notificacioAlertnService = inject(NotificacioAlertnService);

  //public readonly data = inject<string>(MAT_DIALOG_DATA);
  //public readonly data = inject<IRubroLista>(MAT_DIALOG_DATA);
  public readonly data = inject<IRubro>(MAT_DIALOG_DATA);

  rubroService = inject(RubrosService);

  rubro!: IRubro;
  private readonly dialogRef = inject(
    MatDialogRef<AgregaRubroComponent>
  );

  id = new FormControl('', [Validators.required]);
  nombre_rubro = new FormControl('', [Validators.required]);
  usuario_creacion = new FormControl('', [Validators.required]);

  agregaRubro = signal<FormGroup>(
    new FormGroup({
      nombre_rubro: this.nombre_rubro,
    })
  );

  getErrorMessage(campo: string) {
    if (campo === 'nombre_rubro') {
      return this.nombre_rubro.hasError('required') ? 'Debes ingresar Nombre Rubro' : '';
    }
    return '';
  }
  grabar() {
    //Convertir a formato BD (sin puntos, con guion)
    // const rutParaBD = formatRut(cleanRut(this.agregaUsuario().get('rutUsuarioNuevo')!.value), RutFormat.DASH);

    this.rubro = {
      p_id_usuario: 'ADM042',
      //p_id_usuario: this._storage()?.usuarioLogin.usuario!,
      //p_tipo_usuario: this._storage()?.usuarioLogin.tipoUsuario!,
      p_tipo_usuario: 'A',
      p_nombre_rubro: this.agregaRubro().get('nombre_rubro')!.value,

    };
    console.log('rubro a grabar:', this.rubro);

    this.rubroService.postAgregaRubro(this.rubro).subscribe({
      next: (dato: any) => {
        console.log('dato:', dato);
        if (dato.codigo === 200) {
          //alert('Grabó Usuario Bien');
          this.dialogRef.close('agregado');
        }
      },
      error: () => {
        this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
      },
    });
  }
}
