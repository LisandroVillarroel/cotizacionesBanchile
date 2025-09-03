import { Component} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
//import { Progreso } from '@shared/guard/progreso';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatProgressBarModule,
  ],
  template: `

      <div class="container-fluid">
        <!-- Logo + Título -->
        <a>
          <img src="./../../../../assets/logo/bancochile.png" alt="Logo" class="logo-img me-2" />
        </a>
        <span class="titulo mb-0">
            |  Plataforma Cotizaciones Seguros Empresa
          </span>

        <span class='usuarioLogin'>Equipo de desarrollo Entersoft</span>

        <button class="btn-salir" matButton>Cerrar Sesión</button>

      </div>



  `,
  styles: `


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
    font-weight: 500;
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
    color: #285B9B; /* azul claro */
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
  }
  `,
})
export default class HeaderComponent {
  ///  readonly progreso = inject(Progreso);
}
