export interface ISolicitudG {
  Sla: number;
  ID: string;
  Rut: string;
  Contratante: string;
  Rubro: string;
  TipoSeguro: string;
  Fecha: string;
  Observaciones: Array<IObservacion>;
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
export interface IObservacion {
  iteracion: number;
  descripcionObs: string;
  fechaObs: string;
}

