export interface ISolicitudContratante {
  rutCliente?: string;
  nombreRazonSocial?: string;
  seguro?: string;
}

export interface ISolicitudAsegurado {
  rutAsegurado:string;
	nombreAsegurado:string;
	apellidoPaternoAsegurado:string;
	apellidoMaternoAsegurado:string;
	regionAsegurado:string;
	ciudadAsegurado:string;
	comunaAsegurado:string;
	direccionAsegurado:string;
  telefonoAsegurado:string;
  correoAsegurado:string;
}

export interface ISolicitudBeneficiario {
  rutBeneficiario:string;
	nombreBeneficiario:string;
	apellidoPaternoBeneficiario:string;
	apellidoMaternoBeneficiario:string;
	regionBeneficiario:string;
	ciudadBeneficiario:string;
	comunaBeneficiario:string;
	direccionBeneficiario:string;
  telefonoBeneficiario:string;
  correoBeneficiario:string;
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
