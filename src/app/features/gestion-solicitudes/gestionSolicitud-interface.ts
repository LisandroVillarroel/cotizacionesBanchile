import { IObservacion, ISla } from "@features/detalle-solicitud/modelo/detalle-interface";

export interface ISolicitudG {
  id_solicitud: number;
  po_cursor?: IObservacion[];
  pb_cursor?: ICompaniaG[],
  rut_contratante: string;
  nombre_contratante: string;
  rubro: number;
  nombre_rubro: string;
  id_tipo_seguro: number;
  descripcion_tipo_seguro: string;
  fecha_creacion: string;
  fecha_envio_coordinador: string,
  fecha_aprobacion_solicitud: string,
  id_estado_solicitud: number,
  nombre_estado_solicitud: string,
  sla?: string; //ISla;
}

export interface ICompaniaG{
  id_solicitud: number,
  id_compania_seguro: number,
  nombre_compania_seguro: string,
  id_estado_cotizacion: number,
  nombre_estado_cotizacion: string,
  fecha_creacion_cotizacion: string,
  fecha_envio_cotizacion: string,
  fecha_recepcion_cotizacion: string,
  fecha_aprob_recha_cotizacion: string,
  dias_transcurridos: number
}

export interface IGestionResponse{
  codigo: number,
  mensaje: string,
  ps_cursor: ISolicitudG[],
  vcEstado: string,
  vcEstadoCreacion: string
}
