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


export interface DatosUsuarioInterface {
  codigo: number;
  mensaje: string;
  p_cursor: IUsuario[];
  vcEstado: string;
  vcEstadoCreacion: string;
}

export interface IUsuarioListaParametro  {
  datoUsuarioPar: IUsuario,
  tipoUsuario: string,
};
