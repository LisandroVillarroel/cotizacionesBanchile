export interface IRubro {
  id_rubro: number;
  nombre_rubro: string;
  estado_rubro: string;
  fecha_creacion: string;
  usuario_creacion: string;
}

export interface InterfazRubro {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
  p_cursor: IRubro[];
}
