// Para listar compañías
export interface ICompaniaSeguroLista {
  p_id_compania_seguro: number;
  p_rut_compania_seguro: string;
  p_nombre_compania_seguro: string;
  p_direccion_compania_seguro: string;
  p_telefono_compania_seguro: string;
  p_estado_compania_seguro: string;
  p_correo_compania_seguro: string;
  p_fecha_creacion: string;
  p_usuario_creacion: string;
  p_fecha_modificacion: string | null;
  p_usuario_modificacion: string | null;
}

export interface DatosCompaniaSeguroLista {
  codigo: number;
  mensaje: string;
  p_cursor: ICompaniaSeguroLista[];
  vcEstado: string;
  vcEstadoCreacion: string;
}

export interface ICompaniaSeguroCrear {
  p_id_usuario: string;
  p_tipo_usuario: string;
  p_rut_compania_seguro: string;
  p_nombre_compania_seguro: string;
  p_direccion_compania_seguro: string;
  p_telefono_compania_seguro: string;
  p_estado_compania_seguro: string;
  p_correo_compania_seguro: string;
}

export interface DatosCompaniaSeguroCrear {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
}

export interface ICompaniaSeguroModificar {
  p_id_usuario: string;
  p_tipo_usuario: string;
  p_id_compania_seguro: number;
  p_rut_compania_seguro: string;
  p_nombre_compania_seguro: string;
  p_direccion_compania_seguro: string;
  p_telefono_compania_seguro: string;
  p_estado_compania_seguro: string;
  p_correo_compania_seguro: string;
}

export interface DatosCompaniaSeguroModificar {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
}

export interface ICompaniaSeguroEliminar {
  p_id_usuario: string;
  p_tipo_usuario: string;
  p_id_compania_seguro: number;
}

export interface DatosCompaniaSeguroEliminar {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
}
