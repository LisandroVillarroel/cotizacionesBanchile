export interface ISolicitud{
    rut_contratante: string,
    nombre_contratante: string,
    id_rubro: number,
    nombre_rubro: string,
    id_tipo_seguro: number,
    nombre_tipo_seguro: string,
    fecha_creacion: string,
    id_estado: number,
    dias: number,
    asegurados: any[],
    beneficiarios: any[],
    observaciones: any[],
    documentos: any[],
    //faltan datos: Usuario_creeacion, fecha_modificacion,
    // y las interfaces para asegurados/beneficiarios, observaciones y documentos
}

export interface SolicitudInterface {
  codigo: number;
  mensaje: string;
  estado: string;
  estado_creacion: string
  items: ISolicitud[];
  cantidad: number;
}
