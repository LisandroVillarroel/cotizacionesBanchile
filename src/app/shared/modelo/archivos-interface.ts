export interface IDatosArchivo {
  nombre: string;
  tipo: string;
  size: number;
  extension: string;
}

export interface InterfazDatosArchivo {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
  p_cursor: IDatosArchivo[];
}


