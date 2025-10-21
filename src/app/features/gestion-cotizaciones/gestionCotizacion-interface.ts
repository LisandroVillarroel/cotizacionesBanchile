export interface GestionCotizacionInterface {
}

export interface IResumenCotizaciones{
  recibidas: number,
  pendientes: number,
  cotizadas: number,
  devueltas: number,
}

export interface ICotizacion{

}

export interface IGestionCotizacion{
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

export interface IGestionResponse{
  codigo: number,
  mensaje: string,
  p_cursor: IGestionCotizacion[],
  p_cotizaciones_recibidas: number,
  p_cotizaciones_pendientes: number,
  p_solicitudes_cotizadas: number,
  p_solicitudes_con_observaciones: number,
  vcEstado: string,
  vcEstadoCreacion: string
}
