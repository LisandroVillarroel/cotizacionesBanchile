export interface IRubro {
  id_rubro: string;
  nombre_rubro: string;
  estado_rubro: string;
  fecha_creacion: string;
  usuario_creacion: string;
  fecha_modificacion: string
  usuario_modificacion: string;
}

export interface InterfazRubro {
  codigo: number;
  mensaje: string;
  estado: string;
  estado_creacion: string
  items: IRubro[];
  cantidad: number;
}
