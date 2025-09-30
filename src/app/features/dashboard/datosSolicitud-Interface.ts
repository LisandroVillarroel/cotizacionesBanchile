export interface IListadoSolicitudes {
  id_solicitud: number;
            fecha_creacion: Date;
            rut_contratante: string;
            nombre_razon_social_contratante: string;
            id_rubro:number;
            nombre_rubro: string;
            id_tipo_seguro:number;
            nombre_tipo_seguro: string;
            nombre_ejecutivo_banco: string;
            nombre_coordinador: string;
            id_estado_solicitud:number;
            descripcion_estado:string;
}

export interface IResumenSolicitudes {
  vcEstado: string;
  vcEstadoCreacion: string;
  p_EnProceso: number;
  p_EsperandoRespuesta: number;
  p_Aprobadas: number;
  p_ConObservaciones: number;
}

export interface DatosSolicitudesInterface {
  codigo: number;
  mensaje: string;
  vcEstado: string;
  vcEstadoCreacion: string;
  p_cursor: IListadoSolicitudes[];
  //cantidad: number;
  p_EnProceso: number;
  p_EsperandoRespuesta: number;
  p_Aprobadas: number;
  p_ConObservaciones: number;
}
