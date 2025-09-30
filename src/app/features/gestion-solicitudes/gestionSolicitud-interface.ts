import { ICompania, IObservacion } from "@features/detalle-solicitud/detalle-interface";

export interface ISolicitudG {
  Sla: number;
  ID: string;
  Rut: string;
  Contratante: string;
  IdRubro: string;
  Rubro: string;
  IdTipoSeguro: string;
  TipoSeguro: string;
  Fecha: string;
  //Observaciones: IObservacion[];
  //Companias: ICompania[]
}

