export interface IMedioPago {
  id_medio_de_pago: number;
  nombre_medio_de_pago: string;
  fecha_creacion: string;
  usuario_creacion: string;
  fecha_modificacion: string;
  usuario_modificacion: string;
}

export interface InterfazMedioPago {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
  p_cursor: IMedioPago[];
}
