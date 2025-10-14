export interface IBanco {
  id_banco: number;
  nombre_banco: string;
  fecha_creacion: string;
  usuario_creacion: string;
  fecha_modificacion: string;
  usuario_modificacion: string;
}

export interface InterfazBanco {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
  p_cursor: IBanco[];
}
