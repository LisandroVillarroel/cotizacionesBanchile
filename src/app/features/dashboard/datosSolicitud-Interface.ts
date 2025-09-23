export interface IListadoSolicitudes {
  ID: number;
  Fecha: string;
  Contratante: string;
  id_rubro: number;
  desc_rubro: string;
  id_tipo_seguro: number;
  desc_tipoSeguro: string;
  Coordinador: string;
  //Ejecutivo: string;
  Estado: string;
}

export interface IResumenSolicitudes {
  vcEstado: string;
  vcEstadoCreacion: string;
  cantidad: number;
  p_EnProceso: number;
  p_EsperandoRespuesta: number;
  p_Aprobadas: number;
}

export interface DatosSolicitudesInterface {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
  p_cursor: IListadoSolicitudes[];
  //cantidad: number;
  p_EnProceso: number;
  p_EsperandoRespuesta: number;
  p_Aprobadas: number;
  p_ConObservaciones: number;
}
