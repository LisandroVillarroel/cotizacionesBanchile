
import { Component, inject, signal, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { RubrosService } from '../rubros.service';
import { IRubroUpdate, IRubroLista } from '../rubros-interface';
import CabeceraPopupComponente from '@shared/ui/cabeceraPopup.component';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelect, MatSelectModule } from '@angular/material/select';

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
    MatSelect,
    MatOption,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    MatError,
    MatFormFieldModule
  ],
  templateUrl: './modifica-rubro.component.html',
  styleUrls: ['./modifica-rubro.component.css']
})
export class ModificaRubroComponent implements OnInit {
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));
  notificacioAlertnService = inject(NotificacioAlertnService);
  rubroService = inject(RubrosService);

  private readonly dialogRef = inject(MatDialogRef<ModificaRubroComponent>);
  public readonly data = inject<IRubroUpdate>(MAT_DIALOG_DATA);
  public readonly data_ = inject<IRubroLista>(MAT_DIALOG_DATA);

  // FormControls
  id_rubro = new FormControl('', [Validators.required]);
  nombre_rubro = new FormControl('', [Validators.required]);
  estado_rubro = new FormControl('', [Validators.required]);

  // FormGroup con signal
  modificaRubro = signal<FormGroup>(
    new FormGroup({
      id_rubro: this.id_rubro,
      nombre_rubro: this.nombre_rubro,
      estado_rubro: this.estado_rubro
    })
  );


ngOnInit(): void {
  this.id_rubro.setValue(String(this.data.p_id_rubro)); // Convertimos a string
  this.id_rubro.disable(); // ✅ Deshabilita el control en el FormGroup
  this.nombre_rubro.setValue(this.data.p_nombre_rubro);
  this.estado_rubro.setValue(this.data.p_estado_rubro)

  }

  getErrorMessage(campo: string): string {
    if (campo === 'nombre_rubro') {
      return this.nombre_rubro.hasError('required')
        ? 'Debes ingresar Nombre Rubro'
        : '';
    }
    if (campo === 'estado_rubro') {
      return this.estado_rubro.hasError('required')
        ? 'Debes seleccionar un estado'
        : '';
    }
    return '';
  }

  grabar(): void {
    const rubro: IRubroUpdate = {
      p_id_usuario: this._storage()?.usuarioLogin.usuario!,
      p_tipo_usuario: this._storage()?.usuarioLogin.tipoUsuario!,
      p_id_rubro: this.modificaRubro().get('id_rubro')!.value,
      p_nombre_rubro: this.modificaRubro().get('nombre_rubro')!.value,
      p_estado_rubro: this.modificaRubro().get('estado_rubro')!.value
    };
    this.rubroService.postModificaRubro(rubro).subscribe({
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
