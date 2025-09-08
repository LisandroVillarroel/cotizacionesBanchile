import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


/**
 * Notificacion sevicio usando Signal
 * Gestiona las notificaciones de brindis de forma reactiva
 */
@Injectable({
  providedIn: 'root',
})
export class NotificacionBootstrapService {
  constructor(private _snackBar: MatSnackBar) {}


  /**
   * Mostrar una notificación de éxito
   */
  showSuccess(mensaje: string, duracion = 5000): void {
    this.muestraNotificacion('success', mensaje, duracion);
  }

  /**
   * Mostrar una notificación de error
   */
  showError(mensaje: string, duracion = 8000): void {
    this.muestraNotificacion('error', mensaje, duracion);
  }

  /**
   * Mostrar una notificación de advertencia
   */
  showWarning(mensaje: string, duracion = 6000): void {
    this.muestraNotificacion('warning', mensaje, duracion);
  }

  /**
   * Mostrar una notificación de información
   */
    showInfo(mensaje: string, duracion = 5000): void {
    this.muestraNotificacion('info', mensaje, duracion);
  }


  private muestraNotificacion(type: string, mensaje: string, duracion: number): void {



const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${mensaje}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder!.append(wrapper)



  }

}
