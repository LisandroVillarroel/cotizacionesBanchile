//import { IDocumento } from './../../detalle-solicitud/modelo/solicitud-interface';
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
  p_id_usuario: string;
  p_tipo_usuario: string;
  id_rubro: number;
  id_tipo_seguro: number;
  contratante: ISolicitudContratante;
}

export interface IIngresoSolicitud_Recibe {
  codigo: number;
  mensaje: string;
  p_id_solicitud: number;
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
  p_id_usuario?: string;
  p_tipo_usuario?: string;
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

export interface IPersona {
    codigoRetorno: string,
    rutCliente: string,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    oficinaEjecutivo: string,
    codigoEjecutivo: string,
    nombreEjecutivo: string,
    apellidoPaternoEjecutivo: string,
    apellidoMaternoEjecutivo: string,
    emailEjecutivo: string,
    codigoPaisEjecutivo: string,
    codigoCiudadEjecutivo: string,
    telefono: string,
    segmento: string,
    marca: string,
    banca: string,
    clasificacionRiesgo: string,
    actividadEconomica: string,
    categoria: string,
    codigoSegmento: string,
    codigoMarca: string,
    codigoBanca: string,
    codigoActividadEconomica: string,
    fechaNacimiento: string,
    nombreOficina: string,
    tipoCliente: string,
    sexo: string,
    direccion: string,
    numeroDireccion: string,
    complementoDireccion: string,
    comuna: string,
    ciudad: string,
    region: string,
    pais: string,
    tipoDespacho: string,
    cui: string,
    codigoCategoria: string,
    rowIdDireccion: string,
    codigoPaisFonoPartCliente: string,
    codigoCiudadPartCliente: string,
    fonoParticularCliente: string,
    codigoPaisCelularCliente: string,
    codigoCiudadCelularCliente: string,
    celularParticularCliente: string,
    emailParticularCliente: string,
    codigoPaisFonoComCliente: string,
    codigoCiudadFonoComCliente: string,
    fonoComercialCliente: string,
    emailComercialCliente: string,
    emailAlternativoEjecutivo: string,
    rutEjecutivo: string,
    inhabilidad: string,
    nacionalidad: string,
    paisOrigen: string,
    estadoCivil: string,
    regimenMatrimonial: string,
    tipoFATCA: string,
    tinNumSeguroSocial: string,
    rutContacto: string,
    nombreContacto: string,
    apellidoPaternoContacto: string,
    apellidoMaternoContacto: string,
    tipoRelacionContato: string,
    rutConyuge: string,
    tipoVivienda: string,
    nroDependencia: string,
    anoResidencia: string,
    marcaFuncionario: string,
    nivelEstudios: string,
    profesion: string,
    rutEmpleador: string,
    nombreEmpleador: string,
    cargo: string,
    tipoContrato: string,
    fechaContrato: string,
    tipoRenta: string,
    tipoPagoPension: string,
    fondoPension: string,
    usoBancoMonto: string,
    tipoIngrLiquido: string,
    montoIngreso: string,
    fechaActualizacionIngreso: string,
    marcaComparteBcaPrivada: string,
    idioma: string,
    flagEnviaCorreo: string,
    desSexo: string,
    desCui: string,
    comportamiento: string,
    fechaDefuncion: string,
    composicionInstitucional: string,
    evaluacionRiesgo: string,
    tipoClienteNor: string
}

export interface IAseguradoListaParametro {
  datoAseguradoPar: IAseguradoLista;
  idSolicitud: number;
}

/* export interface IAgregaAsegurado {
  p_id_solicitud?: number;
  p_id_usuario?: string;
  p_tipo_usuario?: string;
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
} */

export interface DatosAseguradosInterface {
  codigo: number;
  mensaje: string;
  p_cursor: IAseguradoLista[];
  vcEstado: string;
  vcEstadoCreacion: string;
}

export interface IDatosPersona {
  codigo: number;
  mensaje: string;
  data: IPersona;
}

export interface IBeneficiario {
  p_id_solicitud?: number;
  p_id_usuario?: string;
  p_tipo_usuario?: string;
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

/* export interface IAgregaBeneficiario {
  p_id_solicitud?: number;
  p_id_usuario?: string;
  p_tipo_usuario?: string;
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
} */

export interface IBeneficiarioListaParametro {
  datoBeneficiarioPar: IBeneficiarioLista;
  idSolicitud: number;
}

export interface DatosBeneficiariosInterface {
  codigo: number;
  mensaje: string;
  p_cursor: IBeneficiarioLista[];
  vcEstado: string;
  vcEstadoCreacion: string;
}

export interface IDocumentoLista {
  id_documento_adjunto: string;
  corr_documento: number;
  documento_principal: string;
  ruta_documento_origen: string;
  ruta_documento_destino: string;
  fecha_creacion: string;
  usuario_creacion: string;
}

export interface IIngresarDocumento {
  p_id_solicitud: number;
  p_id_documento_adjunto: string;
  p_documento_principal: string;
  p_ruta_documento_origen: string;
  p_ruta_documento_destino: string;
  p_fecha_creacion: string;
  p_usuario_creacion: string;
  p_corr_documento?: number;
}

export interface IEstadoIngresarDocumento {
  codigo: number;
  mensaje: string;
  p_corr_documento: number;
  vcEstado: string;
  vcEstadoCreacion: string;
}

export interface DatosDocumentoInterface {
  codigo: number;
  mensaje: string;
  p_cursor: IDocumentoLista[];
  vcEstado: string;
  vcEstadoCreacion: string;
}

export interface DetalleSolicitudData {
  idSolicitud: number,
  flagSoloCerrar?: boolean,
}
