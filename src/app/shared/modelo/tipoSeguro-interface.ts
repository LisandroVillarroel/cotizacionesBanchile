export interface ITipoSeguro {
  id_rubro: number;
  id_tipo_seguro: number;
  nombre_tipo_seguro: string;
  // producto_isol: string;
  estado_tipo_seguro: string;
  fecha_creacion: string;
  usuario_creacion: string;
  // fecha_modificacion: string;
  // usuario_modificacion: string;
}

export interface InterfazTipoSeguro {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  c_TipoSeguros: ITipoSeguro[];
  vcEstadoCreacion: string;
}
