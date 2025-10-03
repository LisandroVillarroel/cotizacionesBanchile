export interface IObservacion{
  fecha_creacion_observacion: string;
  fecha_correccion_observacion: string;
  observacion: string;
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
  nombre_estado: string;
}

export interface DetalleSolicitudInterface {
  codigo: number;
  mensaje: string;

  p_rut_contratante: string;
  p_nombre_razon_social_contratante: string;
  p_id_rubro: number;
  p_nombre_rubro: string;
  p_id_tipo_seguro: number;
  p_nombre_tipo_seguro: string;
  p_fecha_creacion_solicitud: string;
  p_id_estado_solicitud: number;
  p_nombre_estado: string;
  p_sla: string;

  c_asegurados: IAseguradoDet[];
  c_beneficiarios: IBeneficiarioDet[];
  c_observaciones: IObservacion[];
  //c_documentos: IDocumento[];
  //c_companias: ICompania[];
  vcEstado: string;
  vcEstadoCreacion: string;
}

export interface IAseguradoDet {
  rut_asegurado: string;
  nombre_razon_social_asegurado: string;
  mail_asegurado: string;
  telefono_asegurado: string;
  region_asegurado: string;
  ciudad_asegurado: string;
  comuna_asegurado: string;
  direccion_asegurado: string;
  numero_dir_asegurado: string;
  departamento_block_asegurado: string;
  casa_asegurado: string;
}

export interface IBeneficiarioDet {
  rut_beneficiario: string;
  nombre_razon_social_beneficiario: string;
  mail_beneficiario: string;
  telefono_beneficiario: string;
  region_beneficiario: string;
  ciudad_beneficiario: string;
  comuna_beneficiario: string;
  direccion_beneficiario: string;
  numero_dir_beneficiario: string;
  departamento_block_beneficiario: string;
  casa_beneficiario: string;
}
