export interface IApruebaRequest {
    p_id_solicitud: number,
    p_id_usuario: string
}

export interface IApruebaResponse{
  codigo: number,
  mensaje: string,
  vcEstado: string,
  vcEstadoCreacion: string
}
