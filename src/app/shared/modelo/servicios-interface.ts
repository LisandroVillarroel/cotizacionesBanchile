export interface IRequest {
  p_id_solicitud: number;
  p_id_usuario: string;
  p_tipo_usuario: string;
}

export interface IRequestFecha {
  p_fecha: string;
  p_id_usuario: string;
  p_tipo_usuario: string;
}

export interface IRequestSm {
  p_id_usuario: string;
  p_tipo_usuario: string;
}

export interface IResponse {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
}

export interface IRequestGestion {
  p_id_usuario: string;
  p_tipo_usuario: string;
}
