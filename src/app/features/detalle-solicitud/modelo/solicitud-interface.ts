export interface IObservacion{
  id_observacion: number;
  id_solicitud: string;
  description: string;
  fecha_creacion: string;
  id_coordinador: string;
}

export interface ICompania{
  id_compania: number;
  id_solicitud: string;
  id_estado_cot: number;
  estado_cotizacion: string;
  fecha_creacion: string;
  id_coordinador: string;
}

export interface IDocumento {
  id: number;
  nombre: string;
  obligatorio: boolean;
  archivo: string;
  archivoNombre: string;
}


