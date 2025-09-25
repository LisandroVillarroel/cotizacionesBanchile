import { Component, effect, inject, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
///import { AutenticaServicio } from '@features/autentica/servicios/autenticaServicio';

@Component({
  selector: 'app-footer',
   standalone: true,
  imports: [MatToolbar, MatIcon, MatButtonModule, MatMenuModule,MatDividerModule],
  template: `
    <mat-toolbar
      class="mat-elevation-z3 relative z-10 [view-transition-name:header]"
    >
      <button mat-icon-button (click)="collapsed.set(!collapsed())">
        <mat-icon>menu</mat-icon>
      </button>


      <div class="container-fluid">
        <!-- Logo + Título -->
        <div style="display: flex">
          <a>
            <img src="./../../../../assets/logo/bancochile.png" alt="Logo" class="logo-img me-2" />
          </a>
<mat-divider [vertical]="true" ></mat-divider>
          <span class="titulo mb-0">
                Footer - Plataforma Cotizaciones Seguros Empresa
          </span>
        </div>

      </div>
      <!--   }-->
    </mat-toolbar>
  `,
  styles: `

    mat-toolbar {
        --mat-toolbar-container-background-color: var(--mat-sys-surface-container-low);
        background-color: #002464;
        color:#cccacaff;
    }

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

  `,
})


export class FooterComponent {
readonly #router = inject(Router);
  ///readonly #AutenticaServicio = inject(AutenticaServicio);

  collapsed = model.required<boolean>();

  darkMode = signal(false);

  setDarkModeClass = effect(() => {
    document.documentElement.classList.toggle('dark', this.darkMode());
  });


}
