import { IAseguradoDet, IBeneficiarioDet, IDocumento } from "@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface";

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

export interface ISolicitud {
  id_solicitud: number;
  fecha_creacion_solicitud: string;
  rut_contratante: string;
  nombre_razon_social_contratante: string;
  id_rubro: number;
  nombre_rubro: string;
  id_tipo_seguro: number;
  nombre_tipo_seguro: string;
  sla: string;
  id_estado_solicitud: number;
  //p_descripcion_estado: string;
}

export interface DetalleSolicitudInterface {
  codigo: number;
  mensaje: string;

  p_fecha_creacion_solicitud: string;
  p_rut_contratante: string;
  p_nombre_razon_social_contratante: string;
  p_id_rubro: number;
  p_nombre_rubro: string;
  p_id_tipo_seguro: number;
  p_nombre_tipo_seguro: string;
  p_sla: string;
  p_id_estado_solicitud: number;
  //p_descripcion_estado: string;

  c_asegurados: IAseguradoDet[];
  c_beneficiarios: IBeneficiarioDet[];
  c_observaciones: any;//IObservacion[];
  //c_documentos: IDocumento[];
  //c_companias: ICompania[];
  vcEstado: string;
  vcEstadoCreacion: string;
}
