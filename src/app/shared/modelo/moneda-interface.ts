export interface IMoneda {
  id_moneda: number;
  nombre_moneda: string;
  fecha_creacion: string;
  usuario_creacion: string;
  fecha_modificacion: string;
  usuario_modificacion: string;
}

export interface InterfazMoneda {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
  p_cursor: IMoneda[];
}
