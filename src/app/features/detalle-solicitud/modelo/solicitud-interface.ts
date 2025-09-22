import { ISolicitudAsegurado, ISolicitudBeneficiario, ISolicitudContratante } from "@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface";

export interface IObservacion{
  id_observacion: number;
  id_solicitud: string;
  description: string;
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
    beneficiarios: ISolicitudBeneficiario[]
    observaciones: IObservacion[],
    documentos: IDocumento[],
    cuestionario: IDocumento
}

export interface SolicitudInterface {
  codigo: number;
  mensaje: string;
  estado_sp: string;
  mensaje_sp: string
  solicitud: ISolicitud[];
  cantidad: number;
}
