import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import MenuComponent from './menu/menu.component';
import HeaderComponent from './header/header.component';
import FooterComponent from "./footer/footer.component";
//import { Progreso } from '@shared/guard/progreso';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    MatIcon,
    MenuComponent,
    RouterOutlet,
    MatButtonModule,
    MatProgressBarModule,
    FooterComponent
  ],
  template: `
  <div class="headerFijo">
    <app-header/>
    <app-menu/>
  </div>
  <main>
    <router-outlet/>
  </main>
  <div class="footerFijo">
    <app-footer />
  </div>

  `,
  styles: `

.headerFijo {
  position: sticky;
  top: 0; /* Asegura que se pegue en la parte superior */
  width: 100%; /* Ocupa todo el ancho */
  background-color: #f0f0f0; /* Ejemplo de color de fondo */
  padding: 10px; /* Espaciado interno */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra opcional */
  z-index: 100; /* Asegura que el encabezado esté por encima del contenido */
}

.footerFijo {
  position: sticky;
  bottom: 0; /* Asegura que se pegue en la parte superior */
  width: 100%; /* Ocupa todo el ancho */
  background-color: #f0f0f0; /* Ejemplo de color de fondo */
  padding: 10px; /* Espaciado interno */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra opcional */
  z-index: 100; /* Asegura que el encabezado esté por encima del contenido */
}


  .content {
        padding: 24px;
        box-sizing: border-box;
      }



  `,
})
export default class PrincipalComponent {

  ///  readonly progreso = inject(Progreso);

}
