export interface ISolicitudCartera {
  id_solicitud: number,
  id_coordinador: string,
  nombre_coordinador: string,
  id_ejecutivo_banco: string,
  nombre_ejecutivo_banco: string,
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
  p_id_coordinador: string,
  rut_coordinador?: string,
  p_nombre_coordinador: string,
  correo_coordinador?: string
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
