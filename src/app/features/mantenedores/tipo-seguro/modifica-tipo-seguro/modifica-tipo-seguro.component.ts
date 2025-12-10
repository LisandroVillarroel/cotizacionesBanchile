import { Component, inject, signal, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { TipoSeguroService } from '../tipo-seguro.service';
import { ITipoSeguroLista, ITipoSeguroUpdate } from '../tipo-seguro-interface';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelect, MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-modifica-tipo-seguro',
  standalone: true,
  imports: [
    CabeceraPopupComponente,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatDialogActions,
    CommonModule,
    MatSelectModule ,
    MatIconModule,
    MatSelect,
    MatButtonModule,
    MatInputModule,
    MatOption,
    MatDialogModule,
    MatFormFieldModule
  ],
  templateUrl: './modifica-tipo-seguro.component.html',
  styleUrl: './modifica-tipo-seguro.component.css'
})
export class ModificaTipoSeguroComponent {
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  notificacioAlertnService = inject(NotificacioAlertnService);
  tipoSeguroService = inject(TipoSeguroService);

  private readonly dialogRef = inject(MatDialogRef<ModificaTipoSeguroComponent>);
  public readonly data = inject<ITipoSeguroUpdate>(MAT_DIALOG_DATA);
  public readonly data_ = inject<ITipoSeguroLista>(MAT_DIALOG_DATA);

  // FormControls
  id_rubro = new FormControl('', [Validators.required]);
  id_tipo_seguro = new FormControl('', [Validators.required]);
  nombre_tipo_seguro = new FormControl('', [Validators.required]);
  estado_tipo_seguro = new FormControl('', [Validators.required]);
  prodIsol = new FormControl('', [Validators.required]);
  minCotizaciones = new FormControl('', [Validators.required]);




  // FormGroup con signal
  modificaTipoSeguro = signal<FormGroup>(
    new FormGroup({
      id_rubro: this.id_rubro,
      id_tipo_seguro: this.id_tipo_seguro,
      nombre_tipo_seguro: this.nombre_tipo_seguro,
      estado_tipo_seguro: this.estado_tipo_seguro,
      prodIsol: this.prodIsol,
      minCotizaciones: this.minCotizaciones
    })
  );


  ngOnInit(): void {
  this.id_tipo_seguro.setValue(String(this.data.p_id_tipo_seguro)); // Convertimos a string
  //this.id_rubro.disable(); // ✅ Deshabilita el control en el FormGroup
  this.nombre_tipo_seguro.setValue(this.data.p_nombre_tipo_seguro);
  this.estado_tipo_seguro.setValue(this.data.p_estado_tipo_seguro)
  this.prodIsol.setValue(this.data_.p_producto_isol);
  this.minCotizaciones.setValue(String(this.data.p_nro_minimo_cotizaciones));
  this.id_rubro.setValue(String(this.data.p_id_rubro));
  }


  getErrorMessage(campo: string): string {
      if (campo === 'nombre_tipo_seguro') {
        return this.nombre_tipo_seguro.hasError('required')
          ? 'Debes ingresar Nombre Rubro'
          : '';
      }
      if (campo === 'estado_tipo_seguro') {
        return this.estado_tipo_seguro.hasError('required')
          ? 'Debes seleccionar un estado'
          : '';
      }
      if (campo === 'prodIsol') {
        return this.prodIsol.hasError('required')
          ? 'Debes ingresar Nro de Producto Isol'
          : '';
      }
      if (campo === 'minCotizaciones') {
        return this.minCotizaciones.hasError('required')
          ? 'Debes ingresar Nro de Mínimo Cotizaciones'
          : '';
      }
      return '';
    }

    grabar(): void {
      const tipoSeguro: ITipoSeguroUpdate = {
        p_id_usuario: 'adm042', // o desde storage
        //p_id_usuario: this._storage()?.usuarioLogin.usuario!,
        //p_tipo_usuario: this._storage()?.usuarioLogin.tipoUsuario!,
        p_tipo_usuario: 'A',
        p_id_rubro: this.modificaTipoSeguro().get('id_rubro')!.value,
        p_id_tipo_seguro: this.modificaTipoSeguro().get('id_tipo_seguro')!.value,
        p_nombre_tipo_seguro: this.modificaTipoSeguro().get('nombre_tipo_seguro')!.value,
        p_prodcuto_isol: this.modificaTipoSeguro().get('prodIsol')!.value,
        p_nro_minimo_cotizaciones: this.modificaTipoSeguro().get('minCotizaciones')!.value,
        p_estado_tipo_seguro: this.modificaTipoSeguro().get('estado_tipo_seguro')!.value
      };

      console.log('Actualizar:', tipoSeguro);

      this.tipoSeguroService.postModificaTipoSeguro(tipoSeguro).subscribe({
        next: (dato: any) => {
          console.log('dato:', dato);
          if (dato.codigo === 200) {
            this.dialogRef.close('modificado');
          }
        },
        error: () => {
          this.notificacioAlertnService.error('ERROR', 'Error Inesperado');
             }
      });
    }
  }
