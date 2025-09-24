import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import MenuComponent from './menu/menu.component';
import HeaderComponent from './header/header.component';
import FooterComponent from './footer/footer.component';
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
    FooterComponent,
  ],
  template: `
    <app-header class="headerFijo" />
    <app-menu class="menuFijo" />
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
  ///  readonly progreso = inject(Progreso);
}
