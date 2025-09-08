import { Component, computed, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
//import { Progreso } from '@shared/guard/progreso';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sildenav/sildenav.component';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
   HeaderComponent,
    MatIcon,
    MatSidenavModule,
    SidenavComponent,
    RouterOutlet,
    MatButtonModule,
    MatProgressBarModule,
  ],
  template: `
    <app-header [(collapsed)]="collapsed" />
  <!--  @if (progreso.isCargando()) {
    <mat-progress-bar class="absolute! top-[64px] z-10" mode="indeterminate" />
    }
-->
    <mat-sidenav-container>
      <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">
        <app-custom-sidenav [collapsed]="collapsed()" />
      </mat-sidenav>

      <mat-sidenav-content class="content" [style.margin-left]="sidenavWidth()">
        <router-outlet/>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `

  :host {
    position: relative;
  }

  .content {
        padding: 24px;
        box-sizing: border-box;
      }

      mat-sidenav-container {
        height: calc(100vh - 64px);
      }

      mat-sidenav-content {
        transition: margin-left 500ms ease-in-out !important;
      }

      mat-sidenav {
        transition: width 500ms ease-in-out !important;
      }

      mat-sidenav {
        --mat-sidenav-container-divider-color: var(--mat-sys-outline-variant);
        --mat-sidenav-container-shape: 0px;
        background-color: #cccacaff;
      }

  `,
})
export default class Principal {
  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));
///  readonly progreso = inject(Progreso);

}
