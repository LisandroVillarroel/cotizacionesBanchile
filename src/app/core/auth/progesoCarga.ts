import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgresoCarga {
  hide() {
    throw new Error('Error Metodo no Progreso Carga');
  }
  isCargando = signal<boolean>(false);
  public ejecutar() {
    this.isCargando.set(true);
  }

  public parar() {
    this.isCargando.set(false);
  }
}
