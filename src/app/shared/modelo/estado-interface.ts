export interface IEstado {
  id_estado_solicitud: string;
  nombre_estado: string;
/*   status_estado: string;
  fecha_creacion: string;
  usuario_creacion: string;
  fecha_modificacion: string
  usuario_modificacion: string; */
}

export interface EstadoInterface {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
  p_cursor: IEstado[];
}
