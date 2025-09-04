import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import MenuComponent from './menu/menu.component';
import HeaderComponent from './header/header.component';
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
  ],
  template: `
    <app-header/>
    <app-menu/>

        <router-outlet/>
  `,
  styles: `


  .content {
        padding: 24px;
        box-sizing: border-box;
      }



  `,
})
export default class PrincipalComponent {

///  readonly progreso = inject(Progreso);

}
