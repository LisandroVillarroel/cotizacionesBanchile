export interface IApruebaCotRequest {
    p_id_solicitud: number,
    p_id_compania_seguro: number,
    p_id_usuario: string,
    p_tipo_usuario: string
}

export interface IApruebaCotResponse{
  codigo: number,
  mensaje: string,
  vcEstado: string,
  vcEstadoCreacion: string
}
