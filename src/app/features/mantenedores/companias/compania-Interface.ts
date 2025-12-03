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

export interface IContactoCompania {
  p_id_ejecutivo_cia: number;
  p_nombre_ejecutivo_cia: string;
  p_correo_ejecutivo_cia: string;
  p_id_compania_seguro: number;
  p_estado_ejecutivo_cia: string;
  p_fecha_creacion: string;
  p_usuario_creacion: string;
  p_fecha_modificacion: string | null;
  p_usuario_modificacion: string | null;
}

export interface DatosContactoCompania {
  codigo: number;
  mensaje: string;
  p_cursor: IContactoCompania[];
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

/* export interface ICompaniaSeguroEliminar {
  p_id_usuario: string;
  p_tipo_usuario: string;
  p_id_compania_seguro: number;
}

export interface DatosCompaniaSeguroEliminar {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
} */

export interface ITipoSeguroCompania {
  p_id_compania_seguro: number;
  p_id_rubro: number;
  p_nombre_rubro: string;
  p_id_tipo_seguro: number;
  p_nombre_tipo_seguro: string | null;
  p_estado_tipo_seguro: string;
  p_fecha_creacion: string;
  p_usuario_creacion: string;
  p_fecha_modificacion: string | null;
  p_usuario_modificacion: string | null;
}

export interface DatosTipoSeguroCompania {
  codigo: number;
  mensaje: string;
  p_cursor: ITipoSeguroCompania[];
  vcEstado: string;
  vcEstadoCreacion: string;
}
