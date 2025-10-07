export interface IDevuelveRequest {
    p_id_solicitud: number,
    p_id_usuario: string,
    p_tipo_usuario: string,
    p_observacion: string
}

export interface IDevuelveResponse{
  codigo: number,
  mensaje: string,
  vcEstado: string,
  vcEstadoCreacion: string
}
