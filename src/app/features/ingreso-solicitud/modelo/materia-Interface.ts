export interface IMateriaIngresa {
  p_id_seccion: number;
  p_id_linea: number;
  p_id_posicion: number;
  p_tipo_dato: string;
  p_valor_dato: string;
  p_largo_dato: number;
  p_decimales_dato: number;
  p_id_listapadre: string;
  p_usuario_creacion: string;
}

export interface IMateria {
  p_id_rubro: number;
  p_id_tipo_seguro: number;
  p_id_seccion: number;
  p_descripcion_seccion: string;
  p_id_linea: number;
  p_id_posicion: number;
  p_tipo_dato: string;
  p_lista: ILista[],
  p_valor_dato: string;
  p_largo_dato: number;
  p_decimales_dato: number;
  p_id_listapadre: string;
  p_descripcion_listapadre: string;
  p_id_listahijo: number;
  p_descripcion_listahijo: string;
  p_fecha_creacion:string;
  estiloClass?:string;
  nombreCampo?:string;
  nombreLabel?:string;
}

export interface ILista {
  p_id_listahijo: number;
  p_descripcion_listahijo: string;
}

export interface IMateriaResultado {
  codigo: number;
  mensaje: string;
  p_cursor: IMateria[];
  vcEstado: string;
  vcEstadoCreacion: string;
}

export interface IMateriaEstructura {
  filas: number;
  columnas: number;
  datos:IMateria[];
}

export interface IMateriaEnvia {
p_id_solicitud: number;
    p_id_rubro: number;
    p_id_tipo_seguro: number;
    items:IMateriaIngresa[];
}

export interface IMateriaTiene {
  codigo: 200,
  mensaje: string;
  p_cursor: IMateria[]
  vcEstado: string
  vcEstadoCreacion: string;
}

export interface IMateriaData {
  id_solicitud: number;
  id_rubro: number;
  id_tipo_seguro: number;
  muestraConsulta: boolean;
}
