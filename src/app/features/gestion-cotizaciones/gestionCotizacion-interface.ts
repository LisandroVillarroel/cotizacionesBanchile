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
  p_id_Solicitud: number,
  p_rut_contratante: string,
  p_nombre_contratante: string,
  p_idrubro: number,
  p_nombre_rubro: string,
  p_id_tipo_seguro: number,
  p_nombre_tipo_seguro: string,
  p_fecha_creacion: string,
  p_fecha_envio_coordinador: string,
  p_fecha_aprobar_solicitud: string,
  p_fecha_emision_propuesta:string,
  p_fecha_aceptacion_solicitud: string,
  p_fecha_rechazo_solicitud: string,
  p_fecha_anulacion_solicitud: string,
  p_id_estado_solicitud: number,
  p_nombre_estado: string,
  p_sla?: string, //ISla;
  p_id_compania_seguro: number,
  nombre_compania_seguro: string,
  p_id_estado_cotizacion: number,
  nombre_estado_cotizacion: string,
  p_fecha_creacion_cotizacion: string,
  p_valor_prima_bruta: number,
  p_valor_prima_neta: number,
  p_fecha_inicio_vigencia: string,
  p_fecha_termino_vigencia: string
}

export interface IGestionResponse{
  codigo: number,
  mensaje: string,
  ps_cursorRec: IGestionCotizacion[],
  ps_cursorPen: IGestionCotizacion[],
  ps_cursorProGen: IGestionCotizacion[],
  ps_cursorProFir: IGestionCotizacion[],
  p_nro_cotiz_reg: number,
  p_nro_prop_pend: number,
  p_nro_prop_gene: number,
  p_nro_prop_firm: number,
  vcEstado: string,
  vcEstadoCreacion: string
}
