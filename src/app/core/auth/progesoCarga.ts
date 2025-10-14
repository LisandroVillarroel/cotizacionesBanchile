import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgresoCarga {
  hide() {
    throw new Error('Method not implemented.');
  }
  isCargando = signal<boolean>(false);
  public ejecutar() {
    this.isCargando.set(true);
  }

  public parar() {
    this.isCargando.set(false);
  }
}
