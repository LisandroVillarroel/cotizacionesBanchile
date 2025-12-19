export interface PersonaInterface {
  codigo: number;
  mensaje: string;
  p_cursor: IPersonaAsociada[];
  vcEstado: string;
  vcEstadoCreacion: string;
}

 export interface IPersona {
  rut: string;      //Con guión y dígito verificador
  idParentezco: number;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombre: string;
  idTipoPersona: number;
  fechaNacimiento: string;
  idEstadoCivil: number;
  mail: string;
  telefono: string;
  idGenero: number;
  idEstado?: number;
}

export interface IPersonaAsociada {
  rut: string;      //Con guión y dígito verificador
  idParentezco: number;
  parentezco: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombre: string;
  idTipoPersona: number;
  tipoPersona: string;
  fechaNacimiento: string;
  idEstadoCivil: number;
  estadoCivil: string;
  mail: string;
  telefono: string;
  idGenero: number;
  genero: string;
  idEstado?: number;
  estado: string;
  /* Datos adicionales */
  regionAsegurado: string;
  ciudadAsegurado: string;
  comunaAsegurado: string;
  direccionAsegurado: string;
  numeroDirAsegurado: string;
  departamentoBlockAsegurado: string;
  casaAsegurado: string;
  fechaCreacion?: string;
  usuarioCreacion?: string;
  fechaModificacion?: string;
  usuarioModificacion?: string;
}

export interface IPersonaTitular {
  id?: number;
  nombre?: string;
  domicilio: IDomicilio;
  telefono: IContacto;
  mail: IContacto;
}

export interface IDomicilio {
  calle: string;
  numero: string;
  pisodepto: string;
  codigoPostal: number;
  idTipoDomicilio: number;
  idComuna: number;
  idCiudad: number;
  idRegion: number;
  idPais: number;
  id: number;
}

export interface IContacto {
  descripcion: string;
  id: number;
}

export interface IDomicilioResp {
  calle: string;
  numero: string;
  pisodepto: string;
  codigoPostal: number;
  idTipoDomicilio: number;
  tipoDomicilio: string;
  idComuna: number;
  comuna: string;
  idCiudad: number;
  ciudad: string;
  idRegion: number;
  region: string;
  idPais: number;
  pais: string;
  id: number;
}

export interface IContactoResp {
  descripcion: string;
  id: number;
  tipoContacto: string;
}
