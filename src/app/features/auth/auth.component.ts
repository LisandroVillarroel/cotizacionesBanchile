import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { StorageService } from '@shared/service/storage.service';
import { AuthService } from './auth.service';
import { NotificacioAlertnService } from '@shared/service/notificacionAlert';
import { IAuth } from './auth-Interface';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export default class AuthComponent {
  authService = inject(AuthService);
  storage = inject(StorageService);
  notificacioAlertnService = inject(NotificacioAlertnService);

  readonly router = inject(Router);

  sesion!: ISesionInterface;

  usuario = new FormControl('', [Validators.required]);

  ingresoLogin = signal<FormGroup>(
    new FormGroup({
      usuario: this.usuario,
    }),
  );

  getErrorMessage(campo: string) {
    if (campo === 'usuario') {
      return this.usuario.hasError('required') ? 'Debes ingresar Usuario' : '';
    }
    return '';
  }

  ingresar() {
    const user: string = this.usuario.value as string;
    this.authService.postLogin(user.toLowerCase()).subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          console.log('dato.p_cursor![0]:', dato.p_cursor![0]);
          this.rescataTipoUsuario(dato.p_cursor![0]);
        }
      },
      error: (error) => {
        void this.notificacioAlertnService.error('ERROR', error.mensaje);
      },
    });
  }

  rescataTipoUsuario(datoUsuario: IAuth) {
    const user: string = this.usuario.value as string;
    this.authService.postTipoUsuario(datoUsuario.perfil_usuario).subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          this.sesion = {
            usuarioLogin: {
              usuario: user,
              perfilUsuario: datoUsuario.perfil_usuario,
              tipoUsuario: dato.p_tipo_usuario!,
              runUsuario: datoUsuario.rut_usuario,
              nombreUsuario:
                datoUsuario.nombre_usuario +
                ' ' +
                datoUsuario.apellido_paterno_usuario +
                ' ' +
                datoUsuario.apellido_materno_usuario,
              mailUsuario: datoUsuario.mail_usuario,
              accessToken: '=)((//&%$#"!$&/((',
            },
          };
          // const datos = JSON.stringify(this.sesion);
          this.storage.set('sesion', this.sesion);
          void this.router.navigate(['portada']);
        }
      },
      error: (error) => {
        void this.notificacioAlertnService.error('ERROR', error.mensaje);
      },
    });
  }
}
