export interface ISolicitudCartera {
  id_solicitud: number,
  id_coordinador: string,
  nombre_coordinador: string,
  id_ejecutivo: string,
  nombre_ejecutivo: string,
  fecha_creacion: string,
  //...
}

export interface ICarteraResponse{
  codigo: number,
  mensaje: string,
  ps_cursor: ISolicitudCartera[],
  vcEstado: string,
  vcEstadoCreacion: string
}

export interface ICoordinador{
  id_coordinador_banco: string,
  rut_coordinador_banco?: string,
  nombre_coordinador_banco: string,
  correo_coordinador_banco?: string
}

export interface ICoordinadorResponse{
  codigo: number,
  mensaje: string,
  p_cursor: ICoordinador[],
  vcEstado: string,
  vcEstadoCreacion: string
}

export interface IEjecutivo{
  id_ejecutivo_banco: string,
  rut_ejecutivo_banco?: string,
  nombre_ejecutivo_banco: string,
  correo_ejecutivo_banco?: string
}

export interface IEjecutivoResponse{
  codigo: number,
  mensaje: string,
  p_cursor: IEjecutivo[],
  vcEstado: string,
  vcEstadoCreacion: string
}
