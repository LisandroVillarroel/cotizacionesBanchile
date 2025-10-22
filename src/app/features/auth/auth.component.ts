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
    authService = inject(AuthService)
    storage = inject(StorageService);
    notificacioAlertnService=inject(NotificacioAlertnService);

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
       this.authService.postLogin(this.ingresoLogin().value?.usuario).subscribe({
        next: (dato) => {
          if (dato.codigo === 200) {
            this.sesion = {
              usuarioLogin: {
                usuario: this.ingresoLogin().value?.usuario,
                perfilUsuario: dato.p_cursor![0].perfil_usuario,
                runUsuario: dato.p_cursor![0].rut_usuario,
                nombreUsuario: dato.p_cursor![0].nombre_usuario + ' ' + dato.p_cursor![0].apellido_paterno_usuario + ' ' + dato.p_cursor![0].apellido_materno_usuario,
                mailUsuario: dato.p_cursor![0].mail_usuario,
                accessToken: '=)((//&%$#"!$&/((',
              }
            }
            this.storage.set('sesion', this.sesion);
            this.router.navigate(['inicio']);

          } else {
            if (dato.codigo === 500) {
              alert('Error:' + dato.mensaje);
              console.log('Error:', dato.mensaje);
            } else {
                 this.notificacioAlertnService.error('ERROR',dato.mensaje)


              console.log('Error:', dato.mensaje);
            }
          }
        },
        error: (error) => {
          console.log('Error Inesperado', error);
        },
      });

    }
/*
    async muestraResultado(mensaje:string){
      const resultado = await this.notificacioAlertnService.confirmacionSelectiva('ERROR LOGIN',mensaje)
                 console.log('resultado:', resultado)
    }
    */
  }
