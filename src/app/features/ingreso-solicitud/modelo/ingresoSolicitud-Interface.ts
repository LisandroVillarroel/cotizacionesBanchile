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

export interface IIngresoSolicitud {
  id_ejecutivo_banco: string;
  id_rubro: number;
  id_tipo_seguro: number;
  contratante: ISolicitudContratante;
  // asegurados: ISolicitudAsegurado[];
  // beneficiarios: ISolicitudBeneficiario[];
}

export interface IIngresoSolicitud_Recibe {
  codigo: number;
  mensaje: string;
  p_id_solicitud: string;
  vcEstado: string;
  vcEstadoCreacion: string;
}

export interface IEstadoIngresoSolicitud {
  codigo: number;
  mensaje: string;
  estado: string;
  estado_creacion: string;
}

export interface IAsegurado {
  p_id_solicitud?: number;
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
  p_usuario_creacion?: string;
}

export interface IAseguradoLista {
  rutAsegurado: string;
  nombreRazonSocialAsegurado: string;
  mailAsegurado: string;
  telefonoAsegurado: string;
  regionAsegurado: string;
  ciudadAsegurado: string;
  comunaAsegurado: string;
  direccionAsegurado: string;
  numeroDirAsegurado: string;
  departamentoBlockAsegurado: string;
  casaAsegurado: string;
  fechaCreacion?: string;
  usuarioCreacion?: string;
  fechaModificacion?: string;
  usuarioModificacion?: string;
}

export interface IAgregaAsegurado {
  p_id_solicitud?: number;
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
  p_usuario_creacion?: string;
}

export interface IModificaAsegurado {
  p_id_solicitud?: number;
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
  p_usuario_modificacion?: string;
}

export interface DatosAseguradosInterface {
  codigo: number;
  mensaje: string;
  p_cursor: IAseguradoLista[];
  vcEstado: string;
  vcEstadoCreacion: string;
}

export interface IBeneficiario {
  p_id_solicitud?: number;
  p_rut_beneficiario: string;
  p_nombre_razon_social_beneficiario: string;
  p_mail_beneficiario: string;
  p_telefono_beneficiario: string;
  p_region_beneficiario: string;
  p_ciudad_beneficiario: string;
  p_comuna_beneficiario: string;
  p_direccion_beneficiario: string;
  p_numero_dir_beneficiario: string;
  p_departamento_block_beneficiario: string;
  p_casa_beneficiario: string;
  p_usuario_creacion?: string;
}

export interface IBeneficiarioLista {
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
  fecha_creacion?: string;
  usuario_creacion?: string;
  fecha_modificacion?: string;
  usuario_modificacion?: string;
}

export interface IAgregaBeneficiario {
  p_id_solicitud?: number;
  p_rut_beneficiario: string;
  p_nombre_razon_social_beneficiario: string;
  p_mail_beneficiario: string;
  p_telefono_beneficiario: string;
  p_region_beneficiario: string;
  p_ciudad_beneficiario: string;
  p_comuna_beneficiario: string;
  p_direccion_beneficiario: string;
  p_numero_dir_beneficiario: string;
  p_departamento_block_beneficiario: string;
  p_casa_beneficiario: string;
  p_usuario_creacion?: string;
}

export interface IModificaBeneficiario {
  p_id_solicitud?: number;
  p_rut_beneficiario: string;
  p_nombre_razon_social_beneficiario: string;
  p_mail_beneficiario: string;
  p_telefono_beneficiario: string;
  p_region_beneficiario: string;
  p_ciudad_beneficiario: string;
  p_comuna_beneficiario: string;
  p_direccion_beneficiario: string;
  p_numero_dir_beneficiario: string;
  p_departamento_block_beneficiario: string;
  p_casa_beneficiario: string;
  p_usuario_modificacion?: string;
}

export interface DatosBeneficiariosInterface {
  codigo: number;
  mensaje: string;
  p_cursor: IBeneficiarioLista[];
  vcEstado: string;
  vcEstadoCreacion: string;
}

export interface ICuestionario {
  id: number;
  nombre: string;
  obligatorio: boolean;
  archivo: string;
  archivoNombre: string;
}
