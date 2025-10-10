import { ICompania, IObservacion, ISla } from "@features/detalle-solicitud/modelo/detalle-interface";

export interface ISolicitudG {
  id_solicitud: number;
  rut_contratante: string;
  nombre_contratante: string;
  rubro: number;
  nombre_rubro: string;
  id_tipo_seguro: number;
  descripcion_tipo_seguro: string;
  fecha_creacion: string;
  id_estado_solicitud: number,
  nombre_estado_solicitud: string,
  Observaciones?: IObservacion[];
  Companias?: ICompania[]
  Sla?: ISla;
}

export interface IGestionResponse{
  codigo: number,
  mensaje: string,
  p_cursor: ISolicitudG[],
  vcEstado: string,
  vcEstadoCreacion: string
}
