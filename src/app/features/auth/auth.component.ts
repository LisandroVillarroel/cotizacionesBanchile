import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { StorageService } from '@shared/service/storage.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export default class AuthComponent {

  storage = inject(StorageService);
  readonly router = inject(Router);

  sesion!: ISesionInterface;

  usuario = new FormControl('', [Validators.required]);

  ingresoLogin = signal<FormGroup>(
    new FormGroup({
      usuario: this.usuario,

    })
  );

  getErrorMessage(campo: string) {
    if (campo === 'usuario') {
      return this.usuario.hasError('required')
        ? 'Debes ingresar Usuario'
        : '';
    }
    return '';
  }

  ingresar() {
    this.sesion = {
      usuarioLogin: {
        usuario: this.ingresoLogin().value?.usuario,
        codigoEjecutivo:this.ingresoLogin().value?.usuario,
        run: '12514508-6',
        nombre: 'Prueba',
        accessToken: '=)((//&%$#"!$&/((',
      }
    }

    this.storage.set('sesion', this.sesion);
    this.router.navigate(['inicio']);
  }
}
