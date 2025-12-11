export interface IRubro {
  p_id_usuario: string;
  p_tipo_usuario: string;
  p_nombre_rubro: string;
}

export interface IRubroUpdate {
  p_id_rubro: number;
  p_nombre_rubro: string;
  p_estado_rubro: string;
  p_id_usuario: string;
  p_tipo_usuario: string;
}

export interface IRubroLista {
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
  p_cursor: IRubroLista[];
}

