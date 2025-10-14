import { inject, Injectable } from '@angular/core';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { StorageService } from '@shared/service/storage.service';



@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  //  Sesion : loginInterface | undefined;
  private _storageService = inject(StorageService);

  loginOut() {
    console.log('Sesion autentica salir');
    this._storageService.remueve('sesion');
  }

  getSesion(): ISesionInterface | null {
    let currentSesion: ISesionInterface | null = null;
    //  console.log('currentSesion:', currentSesion);
    const maybeSesion = this._storageService.get<ISesionInterface>('sesion');

    console.log('sesion:', maybeSesion);

    if (maybeSesion != null) {
      if (this._isvalidSesion(maybeSesion)) {
        currentSesion = maybeSesion;
      } else {
        console.log('sesion invalida');
        this.loginOut();
      }
    }
    return currentSesion;
  }

  private _isvalidSesion(maybeSesion: unknown): boolean {
    console.log('maybeSesion:', maybeSesion);
    return (
      typeof maybeSesion === 'object' &&
      maybeSesion !== null &&
      'usuarioLogin' in maybeSesion
    );
  }
}
