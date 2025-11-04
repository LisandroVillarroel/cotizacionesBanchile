export interface IAgregaCompania {
  p_id_solicitud: number;
  p_id_compania_seguro: number;
  p_detalle_solicitud_cotizacion: string;
  p_id_usuario: string;
  p_tipo_usuario: string;
}

export interface IModificaCompania {
  p_id_solicitud: number;
  p_id_compania_seguro: number;
  p_detalle_solicitud_cotizacion: string;
  p_id_usuario: string;
  p_tipo_usuario: string;
}

export interface IEliminaCompania {
  p_id_solicitud: number;
  p_id_compania_seguro: number;
  p_id_usuario: string;
  p_tipo_usuario: string;
}

export interface IMinimoResponse{
  codigo: number,
  mensaje: string,
  p_minimo_cotizaciones: number,
  vcEstado: string,
  vcEstadoCreacion: string
}
