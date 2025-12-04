
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { StorageService } from '@shared/service/storage.service';
import { Router } from '@angular/router';
//import { Progreso } from '@shared/guard/progreso';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatProgressBarModule,
    MatIcon,
    MatTooltip,
    MatDividerModule,
  ],
  template: `
    <div class="container-fluid">
      <!-- Logo + Título -->
      <div style="display: flex">
        <a>
          <img
            src="assets/logo/bancochile.jpg"
            alt="Logo"
            class="logo-img me-2"
          />
        </a>
        <mat-divider [vertical]="true"></mat-divider>
        <span class="titulo mb-0" style="color: white;">
          Plataforma Cotizaciones Seguros Empresa v.21
        </span>
      </div>
      <div class="usuario-container">
        <span class="usuarioLogin">{{_storage()?.usuarioLogin?.usuario + ' - ' + _storage()?.usuarioLogin?.perfilUsuario + ' - ' + _storage()?.usuarioLogin?.nombreUsuario}}</span>
        <button class="btn-salir" (click)="cerrarSesion()" matTooltip="Cerrar" matButton>
          <mat-icon>exit_to_app</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: `
.mat-divider-vertical{
  background-color: #285B9B;
  height: 30px;
  width: 0px !important;
  position: inherit !important;
  margin-right:10px;
}

 .container-fluid {
    background-color: #002464; /* azul oscuro tipo navy */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-family: 'Roboto', sans-serif;
    min-height: 70px; /* aumenta el grosor del navbar */
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .usuarioLogin {
    color: #ffffff !important;
    font-size: 0.875rem; /* letra pequeña */
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    padding-right:15px;
  }

  .btn-salir {
    background: none;
    border: none;
    color: #ffffff;
    font-size: 0.875rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    cursor: pointer;
    padding: 0;
    white-space: nowrap;
    display: inline-block;
    align-items: center;
  }

  .btn-salir:hover {
    text-decoration: underline;
    font-family: 'Roboto', sans-serif;
  }

  .logo-img {
    max-height: 45px; /* ligeramente más pequeño para equilibrar */
    max-width: 140px;
  }

  .titulo {
    padding-top: 5px;
    color: #285B9B; /* azul claro */
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
  }

  .usuario-container {
  display: flex;
  align-items: center;
  margin-right: 25px; /* mueve el grupo hacia la izquierda */
}

  `,
})
export default class HeaderComponent {
  ///  readonly progreso = inject(Progreso);
  readonly router = inject(Router);
  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

    cerrarSesion(){
      this.storage.remueve('sesion')
       this.router.navigate(['/login']);
    }
}
