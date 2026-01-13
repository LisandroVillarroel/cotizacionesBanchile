
export interface IParametro {
  p_id_usuario: string;
  p_tipo_usuario: string;
  p_nombre_parametro: string;
}

export interface IParametroUpdate {
  p_id_parametro: number;
  p_nombre_parametro: string;
  p_estado_parametro: string;
  p_id_usuario: string;
  p_tipo_usuario: string;
}

export interface IParametroLista {
  p_id_parametro: number;
  p_nombre_parametro: string;
  p_estado_parametro: string;
  p_fecha_creacion: string;
  p_usuario_creacion: string;
  p_fecha_modificacion: string;
  p_usuario_modificacion: string;
}

export interface InterfazParametro {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
  p_cursor: IParametroLista[];
}
