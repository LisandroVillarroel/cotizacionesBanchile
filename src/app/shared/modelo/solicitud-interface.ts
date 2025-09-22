import { ICuestionario, ISolicitudAsegurado, ISolicitudBeneficiario, ISolicitudContratante } from "@features/ingreso-solicitud/modelo/ingresoSolicitud-Interface";

export interface ISolicitud{
    id_solicitud: string,
    id_ejecutivo_banco: string,
    contratante: ISolicitudContratante,
    id_rubro: number,
    nombre_rubro: string,
    id_tipo_seguro: number,
    nombre_tipo_seguro: string,
    fecha_creacion: string,
    id_estado: number,
    dias: number,  // OJO: horas???
    asegurados: ISolicitudAsegurado[],
    beneficiarios: ISolicitudBeneficiario[]
    observaciones: [],
    documentos: [],
    cuestionario: ICuestionario
    //faltan datos: Usuario_creeacion, fecha_modificacion,
    // y las interfaces para  observaciones y documentos
}

export interface SolicitudInterface {
  codigo: number;
  mensaje: string;
  estado_sp: string;
  mensaje_sp: string
  items: ISolicitud[];
  cantidad: number;
}
