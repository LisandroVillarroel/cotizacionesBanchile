export interface IUsuario {
  tipoUsuario: string;
  idUsuario: string;
  rutUsuario: string;
  nombreUsuario: string;
  apePaternoUsuario: string;
  apeMaternoUsuario: string;
  mailUsuario: string;
  telefonoUsuario: string;
  dependenciaUsuario: string;
  idPerfil: string;
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
  datoUsuarioPar: IUsuario,
  tipoUsuario: string,
};
