import { ICompania, ISolicitud } from "@features/detalle-solicitud/modelo/detalle-interface"

export interface IResumenCotizaciones{
  recibidas: number,
  aceptadas: number,
  emitidas: number,
  firmadas: number,
  por_firmar: number
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
  p_id_estado_solicitud: number,
  p_nombre_estado: string,
  p_sla: string, //ISla;
  p_cotizaciones_recibidas?: number,
  p_fecha_aceptacion_solicitud?: string,
  p_fecha_emision_propuesta?:string,
  p_doc_propuesta?: string,
  p_fecha_firma_propuesta?: string,
  selected?: boolean
}

export interface IGestionResponse{
  codigo: number,
  mensaje: string,
  ps_cursorRec: IGestionCotizacion[],
  ps_cursorPen: IGestionCotizacion[],
  ps_cursorProGen: IGestionCotizacion[],
  ps_cursorProFir: IGestionCotizacion[],
  ps_cursorFirPen: IGestionCotizacion[],
  p_nro_cotiz_reg: number,
  p_nro_prop_pend: number,
  p_nro_prop_gene: number,
  p_nro_prop_firm: number,
  p_nro_prop_firm_pend: number
  vcEstado: string,
  vcEstadoCreacion: string
}

export interface IApruebaCotRequest {
    p_id_solicitud: number,
    p_id_compania_seguro: number,
    p_id_usuario: string,
    p_tipo_usuario: string
}

export interface IRespuesta {
  infoGral: ISolicitud;
  compania: ICompania;
  flagAccion: boolean;
}
