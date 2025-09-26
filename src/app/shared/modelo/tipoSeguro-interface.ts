export interface ITipoSeguro {
  id_rubro: number;
  id_tipo_seguro: number;
  nombre_tipo_seguro: string;
  estado_tipo_seguro: string;
  fecha_creacion: string;
  usuario_creacion: string;
}

export interface InterfazTipoSeguro {
  codigo: number;
  mensaje: string;
  c_TipoSeguros: ITipoSeguro[];
  //cantidad: number;
  vcEstado: string;
  vcEstadoCreacion: string;
}
