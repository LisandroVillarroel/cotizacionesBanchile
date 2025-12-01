import { Component, input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-cargando',
  standalone: true,
  imports: [MatProgressSpinner],
  template: `
    @if (loading()) {
    <mat-progress-spinner
      class="absolute! top-1/2 left-1/2 -translate-x 4 -translate-y-1/2"
      [diameter]="size()"
      mode="indeterminate"
    />
    } @else {
    <ng-content />
    }
  `,
  styles: `
    :host {
      display: block;
      position: relative;
    }
  `,
})
export default class CargandoComponent {
  loading = input<boolean>(false);
  size = input<number>(40);
}
