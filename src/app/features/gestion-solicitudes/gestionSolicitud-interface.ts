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
  fecha_envio_coordinador: string,
  fecha_aprobacion_solicitud: string,
  id_estado_solicitud: number,
  nombre_estado_solicitud: string,
  po_cursor?: IObservacion[];
  pb_cursor?: ICompania[],
  Sla?: string; //ISla;
}

export interface IGestionResponse{
  codigo: number,
  mensaje: string,
  p_total_sol_nuevas: number,
  p_total_sol_compania: number,
  p_total_sol_cotizadas: number,
  p_total_sol_obs: number,
  ps_cursor: ISolicitudG[],
  pb_cursor?: ICompania[],
  vcEstado: string,
  vcEstadoCreacion: string
}
