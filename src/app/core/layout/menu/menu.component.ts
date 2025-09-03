import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
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
    RouterLink
],
  template: `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" routerLink="inicio">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="ingreso">Ingresar Solicitud</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Ejecutivo Banco</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contro de Emisión</a>
            </li>
            <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Mantenedores
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Mantenedor 1</a></li>
            <li><a class="dropdown-item" href="#">Mantenedor 2</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Mantenedor 3</a></li>
          </ul>
        </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: `





  `,
})
export default class MenuComponent {
  ///  readonly progreso = inject(Progreso);
}
