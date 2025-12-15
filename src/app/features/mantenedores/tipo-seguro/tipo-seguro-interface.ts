
export interface ITipoSeguro {
  p_id_usuario: string;
  p_tipo_usuario: string;
  p_id_rubro: number;
  p_nombre_tipo_seguro: string;
  p_prodcuto_isol: string;
  p_nro_minimo_cotizaciones: number;
}


export interface ITipoSeguroLista {
  p_id_rubro: number;
  p_nombre_rubro: string;
  p_id_tipo_seguro: number;
  p_nombre_tipo_seguro: string;
  p_producto_isol: string;
  p_nro_minimo_cotizaciones: number;
  p_estado_tipo_seguro: string;
  p_fecha_creacion: string;
  p_usuario_creacion: string;
  p_fecha_modificacion: string;
  p_usuario_modificacion: string;
}

export interface ITipoSeguroUpdate {
  p_id_usuario: string;
  p_tipo_usuario: string;
  p_id_rubro: number;
  p_id_tipo_seguro: number;
  p_nombre_tipo_seguro: string;
  p_prodcuto_isol: string;
  p_nro_minimo_cotizaciones: number;
  p_estado_tipo_seguro: string;
}

export interface InterfazTipoSeguro {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
  p_cursor: ITipoSeguroLista[];
}

