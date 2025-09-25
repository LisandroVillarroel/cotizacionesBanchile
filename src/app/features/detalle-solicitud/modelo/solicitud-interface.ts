import { ISolicitudAsegurado, ISolicitudBeneficiario, ISolicitudContratante } from "@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface";

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

export interface IDocumento {
  id: number;
  nombre: string;
  obligatorio: boolean;
  archivo: string;
  archivoNombre: string;
}

export interface ISolicitud{
    id_solicitud: string,
    id_ejecutivo_banco: string,
    contratante: ISolicitudContratante,
    id_rubro: number,
    nombre_rubro: string,
    id_tipo_seguro: number,
    nombre_tipo_seguro: string,
    fecha_creacion: string,
    fecha_modificacion: string,
    id_estado: number,
    dias: number,  // OJO: horas???
    asegurados: ISolicitudAsegurado[],
    beneficiarios: ISolicitudBeneficiario[];
    //observaciones: IObservacion[];
    //companias: ICompania[];
    //cotizaciones: ICotizacion[];
    documentos: IDocumento[],
    cuestionario: IDocumento
}

export interface SolicitudInterface {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
  p_cursor: ISolicitud;
  //cantidad: number;
}
