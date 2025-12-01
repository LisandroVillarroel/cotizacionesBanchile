export interface IUsuario {
  p_id_usuario_nuevo: string;// ID del nuevo usuario
  p_tipo_usuario_nuevo: string;// Tipo del nuevo usuario, aca hay que llamar un servicio que muestre si es ejec, coor o sup
  p_rut_usuario_nuevo: string; // Rut del nuevo usuario
  p_nombre_usuario_nuevo: string;// Nombre del nuevo usuario
  p_apellido_paterno_usuario_nuevo: string;// Apellido paterno del nuevo usuario
  p_apellido_materno_usuario_nuevo: string;// Apellido materno del nuevo usuario
  p_mail_usuario_nuevo: string;// Correo electrónico del nuevo usuario
  p_telefono_usuario_nuevo: string;// Teléfono del nuevo usuario
  p_id_dependencia_usuario_nuevo: string;// ID de la dependencia del nuevo usuario, llamar el servicio y mostrar los corr o sup dependiendo
  //p_id_perfil: string;// ID del perfil del nuevo usuario
  p_id_usuario: string;  // Usuario que realiza la acción
  p_tipo_usuario: string// Tipo de usuario que realiza la acción

}

export interface IUsuarioLista {
  p_tipo_usuario: string;
  p_id_usuario: string;
  p_rut_usuario: string;
  p_nombre_usuario: string;
  p_apellido_paterno_usuario: string;
  p_apellido_materno_usuario: string;
  p_mail_usuario: string;
  p_telefono_usuario: string;
  p_id_dependencia_usuario: string;
  p_id_perfil: string;
}


export interface DatosUsuarioLista {
  codigo: number;
  mensaje: string;
  p_cursor: IUsuarioLista[];
  vcEstado: string;
  vcEstadoCreacion: string;
}

export interface IUsuarioListaParametro  {
  datoUsuarioPar: IUsuario;
  tipoUsuario: string;
}

export interface IUsuarioPerfile  {
  p_id_perfil: string;
  p_nombre_perfil: string;
  p_codigo_perfil: string;
  p_fecha_creacion: string;
  p_usuario_creacion: string;
  p_fecha_modificacion: string;
  p_usuario_modificacion: string;
}

export interface IUsuarioListaPerfiles  {
  codigo: number;
  mensaje: string;
  perfiles: IUsuarioPerfile[];
  vcEstado: string;
  vcEstadoCreacion: string;
}
