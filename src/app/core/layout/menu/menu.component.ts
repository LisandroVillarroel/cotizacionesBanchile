import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
//import { Progreso } from '@shared/guard/progreso';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule,
    MatProgressBarModule,
    RouterLink,
    RouterModule
],
  template: `
    <nav class="navbar navbar-expand-lg bg-body-tertiary" >
      <div class="container-fluid">

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item border-end" [routerLinkActive]="['active']">
              <a class="nav-link "  aria-current="page" routerLink="inicio">Inicio</a>
            </li>
            <li class="nav-item border-end" [routerLinkActive]="['active']">
              <a class="nav-link"  routerLink="ingreso">Ingreso de Solicitud</a>
            </li>
            <li class="nav-item border-end" [routerLinkActive]="['active']">
              <a class="nav-link" routerLink="gestion">Gestión de Solicitudes</a>
            </li>
            <li class="nav-item border-end" [routerLinkActive]="['active']">
              <a class="nav-link" routerLink="crt">Generación de Informes</a>
            </li>
            <li class="nav-item dropdown" [routerLinkActive]="['active']">
              <a class="nav-link dropdown-toggle" routerLink="mant" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Mantenedores
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Mantenedor 1</a></li>
                <li><a class="dropdown-item" href="#">Mantenedor 2</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Mantenedor 3</a></li>
              </ul>
            </li>
            <li class="nav-item border-end" [routerLinkActive]="['active']">
              <a class="nav-link" routerLink="alertas">Prueba de Alertas</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: `
/*
.navbar-nav .nav-item:hover {
      background-color: #cccacaff;
    }

.navbar .active {
        background-color: #f00 !important;
    }
*/


.active>.nav-link,
.nav-link:hover {
 background-color: #cccacaff !important;
}
  `,
})
export default class MenuComponent {
  ///  readonly progreso = inject(Progreso);
}
