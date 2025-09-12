export interface ITipoSeguro {
  id_rubro: string;
  id_tipo_seguro: string;
  nombre_tipo_seguro: string;
  producto_isol: string
  estado_tipo_seguro: string;
  fecha_creacion: string;
  usuario_creacion: string;
  fecha_modificacion: string;
  usuario_modificacion: string;
}


export interface InterfazTipoSeguro {
  codigo: number;
  mensaje: string;
  estado: string;
  estado_creacion: string
  items: ITipoSeguro[];
  cantidad: number;
}
