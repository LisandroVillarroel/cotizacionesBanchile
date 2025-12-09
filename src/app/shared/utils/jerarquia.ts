import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Jerarquia {
  jerarquia = [
    {
      id: 1,
      p_id_perfil: 'adm_corr',
      p_nombre_perfil: 'Administrador',
      p_codigo_perfil: 'A',
    },
    {
      id: 2,
      p_id_perfil: 'sup_corr',
      p_nombre_perfil: 'Supervisor',
      p_codigo_perfil: 'S',
    },
    {
      id: 3,
      p_id_perfil: 'coord_corr',
      p_nombre_perfil: 'Coordinador',
      p_codigo_perfil: 'C',
    },
    {
      id: 4,
      p_id_perfil: 'ejec_bco',
      p_nombre_perfil: 'Ejecutivo Banco',
      p_codigo_perfil: 'E',
    },
  ];

  jerarquiaAnterior(jerarquiaActual: string) {
    const indice = this.jerarquia.findIndex((j) => j.p_codigo_perfil === jerarquiaActual);
    if (indice > 0) {
      return this.jerarquia[indice - 1];
    } else {
      return null; // No hay jerarquía anterior
    }
  }
}
