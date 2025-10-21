export interface IRequest {
    p_id_solicitud: number,
    p_id_usuario: string
}

export interface IRequestG{
    p_id_solicitud: number,
    p_id_usuario: string,
    p_tipo_usuario: string
}

export interface IResponse {
  codigo: number,
  mensaje: string,
  vcEstado: string,
  vcEstadoCreacion: string
}
