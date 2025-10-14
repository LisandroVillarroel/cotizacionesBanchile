import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgresoCarga {
  isCargando = signal<boolean>(false);
  public ejecutar() {
    this.isCargando.set(true);
  }

  public parar() {
    this.isCargando.set(false);
  }
}
