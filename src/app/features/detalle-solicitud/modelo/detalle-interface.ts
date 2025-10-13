export interface ISla{
  estado: string,
  color: string
}

export interface IObservacion{
  fecha_creacion_observacion: string;
  fecha_correccion_observacion: string;
  observacion: string;
  id_coordinador: string;
  nombre_coordinador: string
}

export interface ICompania{
  p_id_compania_seguro: number;
  p_nombre_compania_seguro: string;

  p_id_estado_cotizacion: number;
  p_id_nombre_estado_cotizacion: string;
  p_fecha_creacion_cotizacion: string; //horas o días???
  p_id_fecha_envio_cotizacion: string;
  p_id_fecha_recepcion_cotizacion: string;
  p_id_fecha_aprob_recha_cotizacion: string;
  p_id_detalle_solicitud_cotizacion: string;
  p_id_moneda: number;
  p_nombre_moneda: string;
  p_valor_prima_neta: number,
  p_valor_prima_afecta: number,
  p_valor_prima_bruta: number,
  p_id_medio_de_pago: number,
  p_nombre_medio_de_pago: string,
  p_id_banco: number,
  p_nombre_banco: string,
  p_id_tipo_cuenta: number,
  p_nombre_tipo_cuenta: string,
  p_nro_cuenta: string,
  p_cantidad_cuotas: number,
  p_fecha_inicio_vigencia: string,
  p_fecha_termino_vigencia: string,
  p_dia_vencimiento_primera_cuota: string,
  p_id_cotizacion_compania: string,
  p_ruta_cotizacion_compania: string,
  p_id_cotizacion_propuesta: string,
  p_ruta_cotizacion_propuesta: string,
  p_fecha_creacion: string,
  p_usuario_creacion: string,
  p_fecha_modificacion: string,
  p_usuario_modificacion: string,
}

export interface ICompaniaResponse{
  codigo: number;
  mensaje: string;
  p_cursor: ICompania[];
  vcEstado: string;
  vcEstadoCreacion: string;
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
  nombre_ejecutivo_banco: string;
  id_ejecutivo_banco: string;
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
  p_nombre_ejecutivo_banco: string;
  p_id_ejecutivo_banco: string;
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
