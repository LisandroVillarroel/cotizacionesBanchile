export interface IRubro {
  p_id_rubro: number;
  p_nombre_rubro: string;
  p_estado_rubro: string;
  p_fecha_creacion: string;
  p_usuario_creacion: string;
  p_fecha_modificacion: string;
  p_usuario_modificacion: string;
}

export interface InterfazRubro {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
  p_cursor: IRubro[];
}
