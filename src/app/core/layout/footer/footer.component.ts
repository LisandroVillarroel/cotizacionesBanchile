import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatButtonModule, MatProgressBarModule, MatIcon, MatTooltip, MatDividerModule],
  template: `
    <div class="container-fluid">
      <img src="./../../../../assets/logo/logofooter.png" alt="Logo" class="logo-img" />
      <div class="footer-center">
        <span class="footer-text">
          © 2025 Banchile Inversiones. Todos los derechos reservados.
        </span>
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
  position: fixed; /* Se fija en la pantalla */
  bottom: 0; /* Se ubica en la parte inferior */
  left: 0;
  width: 100vw; /* 100% del ancho de la ventana */
  height: 70px; /* o usa 100vh si quieres ocupar toda la altura */
  background-color: #ebebed;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  z-index: 100;
}


  .usuarioLogin {
    color: #ffffff !important;
    font-size: 0.875rem; /* letra pequeña */
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
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

  .footer-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* espacio entre logo y texto */
}

.footer-text {
  color: #001c4c;
  font-size: 0.875rem;
  font-family: 'Roboto', sans-serif;
}

.logo-img {
  max-height: 45px;
  max-width: 140px;
  margin-left: 20px;
}

.footer-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: max-content;
}

  `,
})
export default class HeaderComponent {
  ///  readonly progreso = inject(Progreso);
}
