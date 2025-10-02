export interface IMateria {
  p_id_rubro: number;
  p_id_tipo_seguro: number;
  p_id_seccion: number;
  p_descripcion_seccion: string;
  p_id_linea: number;
  p_id_posicion: number;
  p_tipo_dato: string;
  p_valor_dato: string;
  p_largo_dato: number;
  p_decimales_dato: number;
  p_fecha_creacion: string;
}

export interface IMateriaResultado {
  codigo: number;
  mensaje: string;
  p_cursor: IMateria[];
  vcEstado: string;
  vcEstadoCreacion: string;
}
