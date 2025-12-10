import { Component, inject, signal } from '@angular/core';
import CabeceraPopupComponente from "../../../../shared/ui/cabeceraPopup.component";
import { MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormField, MatLabel, MatError, MatFormFieldModule } from "@angular/material/form-field";
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from '@angular/common';
import { ITipoSeguro } from '../tipo-seguro-interface';
import { TipoSeguroService } from '../tipo-seguro.service';

@Component({
  selector: 'app-agrega-tipo-seguro',
  standalone: true,
  imports: [
    CabeceraPopupComponente,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatError,
    MatDialogActions,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatOption,
    MatSelectModule,
    CommonModule],
  templateUrl: './agrega-tipo-seguro.component.html',
  styleUrl: './agrega-tipo-seguro.component.css'
})
export class AgregaTipoSeguroComponent {


  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  notificacioAlertnService = inject(NotificacioAlertnService);

  //public readonly data = inject<string>(MAT_DIALOG_DATA);
  //public readonly data = inject<IRubroLista>(MAT_DIALOG_DATA);
  public readonly data = inject<ITipoSeguro>(MAT_DIALOG_DATA);

  tipoSeguroService = inject(TipoSeguroService);

  tipoSeguro!: ITipoSeguro;
  private readonly dialogRef = inject(
    MatDialogRef<AgregaTipoSeguroComponent>
  );

  idRubro = new FormControl('', [Validators.required]);
  nomTipoSeguro = new FormControl('', [Validators.required]);
  //usuario_creacion = new FormControl('', [Validators.required]);
  prodIsol = new FormControl('', [Validators.required]);
  nroMinCotizaciones = new FormControl('', [Validators.required]);

  agregaTipoSeguro = signal<FormGroup>(
    new FormGroup({
      idRubro: this.idRubro,
      nomTipoSeguro: this.nomTipoSeguro,
      //usuario_creacion: this.usuario_creacion,
      prodIsol: this.prodIsol,
      minCotizaciones: this.nroMinCotizaciones,
    })
  );

  getErrorMessage(campo: string) {
    if (campo === 'nomTipoSeguro') {
      return this.nomTipoSeguro.hasError('required')
        ? 'Debes ingresar Nombre Tipo Seguro'
        : '';
    }
    if (campo === 'prodIsol') {
      return this.nomTipoSeguro.hasError('required')
        ? 'Debes ingresar Producto Isol'
        : '';
    }
    if (campo === 'nroMinCotizaciones') {
      return this.nomTipoSeguro.hasError('required')
        ? 'Debes ingresar la cantidad mínima de cotizaciones'
        : '';
    }
    if (campo === 'idRubro') {
      return this.nomTipoSeguro.hasError('required')
        ? 'Debes seleccionar un Rubro'
        : '';
    }
    return '';
  }
  grabar() {
    //Convertir a formato BD (sin puntos, con guion)
    // const rutParaBD = formatRut(cleanRut(this.agregaUsuario().get('rutUsuarioNuevo')!.value), RutFormat.DASH);

    this.tipoSeguro = {
      p_id_usuario: 'adm042',
      //p_id_usuario: this._storage()?.usuarioLogin.usuario!,
      //p_tipo_usuario: this._storage()?.usuarioLogin.tipoUsuario!,
      p_tipo_usuario: 'A',
      p_id_rubro: this.agregaTipoSeguro().get('idRubro')!.value,
      p_nombre_tipo_seguro: this.agregaTipoSeguro().get('nomTipoSeguro')!.value,
      p_prodcuto_isol: this.agregaTipoSeguro().get('prodIsol')!.value,
      p_nro_minimo_cotizaciones: this.agregaTipoSeguro().get('minCotizaciones')!.value,
    };
    console.log('Tipo Seguro a grabar:', this.tipoSeguro);

    this.tipoSeguroService.postAgregaTipoSeguro(this.tipoSeguro).subscribe({
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
