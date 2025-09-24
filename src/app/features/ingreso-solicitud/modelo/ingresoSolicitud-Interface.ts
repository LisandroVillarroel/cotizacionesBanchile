export interface ISolicitudContratante {
  rut_contratante: string;
  nombre_razon_social_contratante: string;
  mail_contratante: string;
  telefono_contratante: string;
  region_contratante: string;
  ciudad_contratante: string;
  comuna_contratante: string;
  direccion_contratante: string;
  numero_dir_contratante: string;
  departamento_block_contratante: string;
  casa_contratante: string;
}

export interface ISolicitudAsegurado {
  p_id_ejecutivo_banco?: string;
  p_id_solicitud?: string;
  p_rut_asegurado: string;
  p_nombre_razon_social_asegurado: string;
  p_mail_asegurado: string;
  p_telefono_asegurado: string;
  p_region_asegurado: string;
  p_ciudad_asegurado: string;
  p_comuna_asegurado: string;
  p_direccion_asegurado: string;
  p_numero_dir_asegurado?: string;
  p_departamento_block_asegurado?: string;
  p_casa_asegurado?: string;
}

export interface IIngresoAsegurado {
  p_id_ejecutivo_banco?: string;
  p_id_solicitud?: string;
  p_rut_asegurado: string;
  p_nombre_razon_social_asegurado: string;
  p_mail_asegurado: string;
  p_telefono_asegurado: string;
  p_region_asegurado: string;
  p_ciudad_asegurado: string;
  p_comuna_asegurado: string;
  p_direccion_asegurado: string;
  p_numero_dir_asegurado: string;
  p_departamento_block_asegurado: string;
  p_casa_asegurado: string;
}

export interface IModificaAsegurado {
  p_id_ejecutivo_banco?: string;
  p_id_solicitud?: string;
  p_rut_asegurado: string;
  p_nombre_razon_social_asegurado: string;
  p_mail_asegurado: string;
  p_telefono_asegurado: string;
  p_region_asegurado: string;
  p_ciudad_asegurado: string;
  p_comuna_asegurado: string;
  p_direccion_asegurado: string;
  p_numero_dir_asegurado: string;
  p_departamento_block_asegurado: string;
  p_casa_asegurado: string;
}

export interface ISolicitudBeneficiario {
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

export interface ICuestionario {
  id: number;
  nombre: string;
  obligatorio: boolean;
  archivo: string;
  archivoNombre: string;
}

export interface IIngresoSolicitud {
  id_ejecutivo_banco: string;
  id_rubro: string;
  id_tipo_seguro: string;
  contratante: ISolicitudContratante;
  asegurados: ISolicitudAsegurado[];
  beneficiarios: ISolicitudBeneficiario[];
}

export interface IEstadoIngresoSolicitud {
  codigo: number;
  mensaje: string;
  estado: string;
  estado_creacion: string;
}

/* export interface IAgregaAsegurado {
  id_ejecutivo_banco: string;
  id_rubro: string;
  id_tipo_seguro: string;
  contratante: ISolicitudContratante;
  asegurados: ISolicitudAsegurado[];
  beneficiarios: ISolicitudBeneficiario[];
} */
