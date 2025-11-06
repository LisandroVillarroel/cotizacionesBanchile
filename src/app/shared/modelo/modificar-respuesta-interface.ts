export interface IModificarRespuesta {
  p_id_usuario: string;
  p_tipo_usuario: string;
  p_id_solicitud: number;
  p_id_compania_seguro: number;
  p_id_moneda: number;
  p_valor_prima_neta: number;
  p_valor_prima_afecta: number;
  p_valor_prima_bruta: number;
  p_id_medio_de_pago: number;
  p_id_banco: number;
  p_id_tipo_cuenta: number;
  p_nro_cuenta: string;
  p_cantidad_cuotas: number;
  p_fecha_inicio_vigencia: string;
  p_fecha_termino_vigencia: string;
  p_dia_vencimiento_primera_cuota: string;
  p_id_cotizacion_compania: string;
  p_ruta_cotizacion_compania: string;
  p_id_cotizacion_propuesta: string;
  p_ruta_cotizacion_propuesta: string;
  p_detalle_solicitud_cotizacion: string;
}

export interface InterfazModificarRespuesta {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
  p_cursor: IModificarRespuesta[];
}
