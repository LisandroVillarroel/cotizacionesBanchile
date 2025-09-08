import { Component, computed, inject, input, signal } from '@angular/core';
///import { loginInterface } from '@features/autentica/interface/loginInterface';
///import { StorageService } from '@shared/guard/storage.service';
//import { AppStore } from '../../../../app.store';

@Component({
  selector: 'app-sidenav-header',
  standalone: true,
  imports: [],
  template: `
  <!--
    <div class="pt-6 flex flex-col items-center">
      <img
        class="object-cover object-center rounded-full mb-3 aspect-square"
        [width]="profilePicSize()"
        [height]="profilePicSize()"
        [src]="'person-placeholder.png'"
      />
      <div
        class="text-center mb-2 h-[3rem] {{
          collapsed() ? 'h-0! opacity-0' : ''
        }}"
      >
        <h2 class="text-[10px]">

        </h2>
        <p class="text-[10px]">{{ 'Supervisor' }}</p>
      </div>
    </div>
-->
  `,
  styles: `

  :host * {
    transition-property: width, height, opacity;
    transition-duration: 500ms;
    transition-timing-function: ease-in-out;
  }

  `,
})
export default class SidenavHeaderComponent {
  collapsed = input(false);

  //appStore = inject(AppStore);
  ///readonly #storage = inject(StorageService);
  ///_storage = signal(this.#storage.get<loginInterface>('sesion'));
  profilePicSize = computed(() => (this.collapsed() ? '32' : '100'));
}
