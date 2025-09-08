import { Component, computed, inject, input } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MenuItemComponent } from './menu-items/menu-items.component';
import { menuItems } from './menu-items';
import SidenavHeaderComponent from './sidenav-header/sidenav-header.componet';

//import { AppStore } from '../../../app.store';

@Component({
  selector: 'app-custom-sidenav',
  template: `
    <app-sidenav-header [collapsed]="collapsed()" />
    <mat-nav-list class="[--mat-list-active-indicator-shape:0px] mb-6">
      @for (item of menuItems; track item.despliegaNombre) {
      <app-menu-item [item]="item" [collapsed]="collapsed()" />
      }
    </mat-nav-list>
  `,
  styles: [
    `
      :host * {
        transition-property: width, height, opacity;
        transition-duration: 500ms;
        transition-timing-function: ease-in-out;
      }


    `,
  ],
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatIconModule,
    MenuItemComponent,
    SidenavHeaderComponent,
  ],
})
export class SidenavComponent {
  // appStore = inject(AppStore);

  collapsed = input<boolean>(false);

  menuItems = menuItems;
}
