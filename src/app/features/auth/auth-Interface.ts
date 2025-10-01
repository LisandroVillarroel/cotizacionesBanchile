export interface IAuth {
perfil_usuario: string;
rut_usuario: string;
nombre_usuario: string;
apellido_paterno_usuario: string;
apellido_materno_usuario: string;
mail_usuario: string;
}


export interface IAuthRespuesta {
  codigo: number;
  mensaje: string;
  vcEstado?: string;
  p_cursor?: IAuth[];
  vcEstadoCreacion?: string;
}
