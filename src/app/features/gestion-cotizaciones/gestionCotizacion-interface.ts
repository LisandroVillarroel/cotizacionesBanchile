import { IObservacion } from "@features/detalle-solicitud/modelo/detalle-interface";
import { ICompaniaG } from '@features/gestion-solicitudes/gestionSolicitud-interface';

export interface IRequestGestion{
  p_id_usuario: string,
  p_tipo_usuario: string
}

export interface IResumenCotizaciones{
  recibidas: number,
  pendientes: number,
  emitidas: number,
  firmadas: number,
}

export interface ICotizacion{

}

export interface IGestionCotizacion{
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
  sla?: string; //ISla;
}

export interface IGestionResponse{
  codigo: number,
  mensaje: string,
  ps_cursor: IGestionCotizacion[],
  // pp_cursor: IGestionCotizacion[],
  // pf_cursor: IGestionCotizacion[],
  // pc_cursor: IGestionCotizacion[],
  p_nro_cotiz_reg: number,
  p_nro_prop_pend: number,
  p_nro_prop_gene: number,
  p_nro_prop_firm: number,
  vcEstado: string,
  vcEstadoCreacion: string
}
