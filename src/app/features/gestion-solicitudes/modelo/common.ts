export interface ISolicitud {
  ID: number;
  Fecha: string;
  Contratante: string;
  Rubro: string;
  TipoSeguro: string;
  Coordinador: string;
  Estado: string;
}

export interface ITipoRubro {
  codigoRubro: number;
  descripcionRubro: string;
}

export interface ITipoSeguro {
  codigoSeguro: number;
  descripcionSeguro: string;
  codigoRubro: number;
}

export interface IEstado {
  codigoEstado: number;
  descripcionEstado: string;
}

/* export interface IEstadoColor {
  estado: string;
  color: string;
  background: string;
} */
