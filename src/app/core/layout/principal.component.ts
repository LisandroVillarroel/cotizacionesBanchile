import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import MenuComponent from './menu/menu.component';
import HeaderComponent from './header/header.component';
import FooterComponent from './footer/footer.component';
import { ProgresoCarga } from '@core/auth/progesoCarga';
//import { Progreso } from '@shared/guard/progreso';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    MenuComponent,
    RouterOutlet,
    MatButtonModule,
    MatProgressBarModule,
    FooterComponent,
  ],
  template: `
    <app-header class="headerFijo" />

    <app-menu  class="menuFijo"/>
     @if (progresoCarga.isCargando()) {
        <mat-progress-bar  class="cargaProgresoFijo" mode="indeterminate"/>
     }
    <main>

      <router-outlet />
    </main>
    <app-footer class="footerFijo" />
  `,
  styles: `

.headerFijo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  background-color: #f0f0f0;
  z-index: 100;
}

.menuFijo {
  position: fixed;
  top: 60px; /* justo debajo del header */
  left: 0;
  width: 100vw;
  height: 50px; /* ajusta según el alto del menú */
  background-color: #e0e0e0;
  z-index: 99;
}
.cargaProgresoFijo {
  position: fixed;
  top: 100px; /* justo debajo del header */
  left: 0;
  width: 100vw;
  height: 10px; /* ajusta según el alto del menú */
  z-index: 101;
}

main {
  margin-top: 110px; /* suma la altura del header y del menú */
  padding: 24px;
  box-sizing: border-box;
}



  .content {
        padding: 24px;
        box-sizing: border-box;
      }



  `,
})
export default class PrincipalComponent {
    readonly progresoCarga = inject(ProgresoCarga);
}
