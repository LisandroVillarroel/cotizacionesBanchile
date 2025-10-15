export interface ITipoCuenta {
  id_tipo_cuenta: number;
  nombre_tipo_cuenta: string;
  fecha_creacion: string;
  usuario_creacion: string;
  fecha_modificacion: string;
  usuario_modificacion: string;
}

export interface InterfazTipoCuenta {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
  p_cursor: ITipoCuenta[];
}
