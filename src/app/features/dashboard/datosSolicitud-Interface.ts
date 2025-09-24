export interface IListadoSolicitudes {
  idSolicitud: number;
  fechaCreacionSolicitud: string;
  rutContratante: string;
  nombreContratante: string;
  idRubro: number;
  descripcionRubro: string;
  idProducto: number;
  descripcionTipoSeguro: string;
  nombreEjecutivo: string;
  nombreCoordinador: string;
  estadoSolicitud: string;
}

export interface IResumenSolicitudes {
  vcEstado: string;
  vcEstadoCreacion: string;
  p_EnProceso: number;
  p_EsperandoRespuesta: number;
  p_Aprobadas: number;
  p_ConObservaciones: number;
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
