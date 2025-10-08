import { Component, input, signal, inject, effect } from '@angular/core';
import { MateriaService } from '../service/materia.service';
import { IMateria, IMateriaEnvia, IMateriaEstructura, IMateriaIngresa, IMateriaResultado, IMateriaTiene } from '../modelo/materia-Interface';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';
import { SoloDecimalNumerosDirective } from '@shared/directiva/solo-decimal-numeros.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { CUSTOM_DATE_FORMATS } from '@shared/ui/formatoFecha';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-materia-asegurada',
  standalone: true,
  imports: [NgClass, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatDialogModule, SoloDecimalNumerosDirective, MatDatepickerModule, MatIconModule],
  providers: [provideMomentDateAdapter(CUSTOM_DATE_FORMATS),],
  templateUrl: './materia-asegurada.component.html',
  styleUrl: './materia-asegurada.component.css',
})
export class MateriaAseguradaComponent {
  idSolicitud = input.required<string>();
  idRubro = input.required<number>();
  idSeguro = input.required<number>();

  storage = inject(StorageService);
  _storage = signal(this.storage.get<ISesionInterface>('sesion'));

  materiaService = inject(MateriaService);

  datoMateriaTiene = signal<IMateria[]>([]);
  datoMateria = signal<IMateria[]>([]);
  datoMateria_Recorre: IMateria[] = [];

  datoMateriaEstructura = signal<IMateriaEstructura[]>([])
  datoMateriaEstructura_arr: IMateriaEstructura[] = []

  materiaIngresa: IMateriaIngresa[] = []

  constructor() {
    effect(() => {
      // Llamar al método cada vez que el valor cambie
      this.datoMateriaEstructura_arr = [];
      this.rescataListaMaterias(this.idRubro(), this.idSeguro());
    });
  }

  materiaForm = signal<FormGroup>(
    new FormGroup({

    }))


  rescataListaMaterias(idRubro: number, idSeguro: number) {
    this.materiaService
      .postListadoMatetria(idRubro, idSeguro)
      .subscribe({
        next: (dato: IMateriaResultado) => {
          if (dato.codigo === 200) {
            this.datoMateria.set(dato.p_cursor);
            this.rescataTieneMateria(Number(this.idSolicitud()), idRubro, idSeguro)

          } else {
            if (dato.codigo != 500) {
              console.log('Error:', dato.mensaje);
            } else {
              console.log('Error de Sistema:');
            }
          }
        },
        error: (error) => {
          console.log('Error Inesperado', error);
        },
      });
  }

  rescataTieneMateria(idSolicitud: number, idRubro: number, idSeguro: number) {
    this.materiaService
      .postConsultaMatetria(idSolicitud, idRubro, idSeguro)
      .subscribe({
        next: (dato: IMateriaTiene) => {
          if (dato.codigo === 200) {
            this.datoMateriaTiene.set(dato.p_cursor);
            this.modificaOriginal(); /// Busca y modifica lo encontrado
            this.creaEstructura()
          } else {
            if (dato.codigo != 500) {
              console.log('Error:', dato.mensaje);
            } else {
              console.log('Error de Sistema:');
            }
          }
        },
        error: (error) => {
          console.log('Error Inesperado', error);
        },
      });
  }


  modificaOriginal() {
    if (this.datoMateriaTiene().length != 0) {
      const datoMateriaTiene_final = this.datoMateriaTiene().filter((valor) => valor.p_valor_dato != null && valor.p_valor_dato != '' && (valor.p_tipo_dato != 'TITULO'))
      this.datoMateria.set(this.datoMateria().map(valorOriginal => {
        const modificadoItem = datoMateriaTiene_final.find(modifica => modifica.p_id_seccion === valorOriginal.p_id_seccion && modifica.p_id_linea === valorOriginal.p_id_linea && modifica.p_id_posicion === valorOriginal.p_id_posicion);
        return modificadoItem ? { ...valorOriginal, p_valor_dato: modificadoItem.p_valor_dato } : valorOriginal;
      })
    )
    }
  }


  creaEstructura() {
    let valoresFila;
    let valorClass = '';
    let nombreCampo = ''
    let nombreLabel = '';
    let valorEntero = 0;
    let valorInicial = 0;
    let valorColumna = 0;

    //Cuenta secciones
    const cuantaSecciones = this.datoMateria().reduce((acumulador, dato) => {
      const seccion = dato.p_id_seccion;
      acumulador[seccion] = (acumulador[seccion] || 0) + 1;
      return acumulador;
    }, {} as Record<number, number>); // Se usa una aserción de tipo para el acumulador

    const cuantaSeccionesArreglo: [string, number][] = Object.entries(cuantaSecciones); //Pasa a un arreglo

    for (let i = 0; i < cuantaSeccionesArreglo.length; i++) { //Recorre Secciones
      this.datoMateria_Recorre = this.datoMateria().filter((valor) => valor.p_id_seccion == Number(cuantaSeccionesArreglo[i][0])) //Compara la fila i el valor que esta en la fila 0 Numero de seccion
      //Cuenta Columnas por fila
      const cuantaColumnas = this.datoMateria_Recorre.reduce((acumulador, dato) => {
        const linea = dato.p_id_linea;
        acumulador[linea] = (acumulador[linea] || 0) + 1;
        return acumulador;
      }, {} as Record<number, number>); // Se usa una aserción de tipo para el acumulador

      const cuantaColumnasArreglo: [string, number][] = Object.entries(cuantaColumnas); //Pasa a un arreglo
      valorClass = '';
      nombreCampo = ''
      nombreLabel = '';

      for (let a = 0; a < cuantaColumnasArreglo.length; a++) { //Recorre file
        valoresFila = this.datoMateria_Recorre.filter((valor) => valor.p_id_linea == Number(cuantaColumnasArreglo[a][0])) //Compara de la fila i el valor que esta en la fila 0 Numero de Linea
        //console.log('valoresFila:',valoresFila)
        //valorResto=12 % (Number(cuantaColumnasArreglo[a][1]))  //toma valor resto
        valorEntero = Math.trunc(12 / (Number(cuantaColumnasArreglo[a][1]))) // Toma valor entero sin redondear
        valorInicial = 12 - (valorEntero * Number(cuantaColumnasArreglo[a][1]))// resta el total(valor entero de la division*cantidad de columnas)
        for (let b = 0; b < Number(cuantaColumnasArreglo[a][1]); b++) {//Recorre columna
          if (b == 0) {
            valorColumna = valorEntero + valorInicial
          } else {
            valorColumna = valorEntero
          }
          valorClass = 'col-md-' + (valorColumna).toString() + ' border';
          if (valoresFila[b].p_tipo_dato == 'TITULO') {
            if (Number(cuantaColumnasArreglo[a][1]) > 1) {
              valorClass = valorClass + ' subTitulo'
            } else {
              valorClass = valorClass + ' titulo'
            }
            nombreLabel = valoresFila[b].p_valor_dato;
          } else { //Si es campo
            nombreCampo = valoresFila[b].p_id_rubro + '_' + valoresFila[b].p_id_tipo_seguro + '_' + valoresFila[b].p_id_seccion + '_' + valoresFila[b].p_id_linea + '_' + valoresFila[b].p_id_posicion
            this.agregaFormControl(nombreCampo, valoresFila[b].p_valor_dato, false)
          }
          valoresFila[b].estiloClass = valorClass
          valoresFila[b].nombreCampo = nombreCampo
          valoresFila[b].nombreLabel = nombreLabel
        }

        this.datoMateriaEstructura_arr.push({
          filas: Number(cuantaColumnasArreglo[a][0]),
          columnas: Number(cuantaColumnasArreglo[a][1]),
          datos: valoresFila
        })
        //  console.log('valor fila:', Number(cuantaColumnasArreglo[a][0]), '-', valoresFila)
      }
    }
    this.datoMateriaEstructura.set(this.datoMateriaEstructura_arr);
  }


  agregaFormControl(nombreCampo: string, ValorInicial: any, requerido: boolean): void {
    this.materiaForm().addControl(nombreCampo, new FormControl(ValorInicial.trim()));
  }

  grabarMateria() {
    let nombreCampo = '';
    this.materiaIngresa = [];
    for (const fila of this.datoMateriaEstructura()) {
      for (const columna of fila.datos) {
        nombreCampo = ''
        if (columna.p_tipo_dato != 'TITULO')
          nombreCampo = this.materiaForm().get(columna.nombreCampo!)!.value

        if (columna.p_tipo_dato == 'FECHA' && (this.materiaForm().get(columna.nombreCampo!)!.value != '') && (this.materiaForm().get(columna.nombreCampo!)!.value != null))
          nombreCampo = (this.materiaForm().get(columna.nombreCampo!)!.value).format('DD/MM/YYYY')

        if (nombreCampo == null)
          nombreCampo = ''

        this.materiaIngresa.push({
          p_id_seccion: columna.p_id_seccion,
          p_id_linea: columna.p_id_linea,
          p_id_posicion: columna.p_id_posicion,
          p_tipo_dato: columna.p_tipo_dato,
          p_valor_dato: nombreCampo,
          p_largo_dato: columna.p_largo_dato,
          p_decimales_dato: columna.p_decimales_dato,
          p_id_listapadre: columna.p_id_listapadre,
          p_usuario_creacion: this._storage()?.usuarioLogin.usuario!
        })
      }
    }
    console.log('paso 2')
    const envioMateria: IMateriaEnvia = {
      p_id_solicitud: Number(this.idSolicitud()),
      p_id_rubro: this.idRubro(),
      p_id_tipo_seguro: this.idSeguro(),
      items: this.materiaIngresa
    }

    this.materiaService.postAgregaAsegurado(envioMateria).subscribe({
      next: (dato) => {
        if (dato.codigo === 200) {
          alert('Grabó Asegurado Bien');
        } else {
          alert('Error:' + dato.mensaje);
          console.log('Error:', dato.mensaje);
        }
      },
      error: (error) => {
        console.log('Error Inesperado', error);
      },
    });
  }

comparavalorLista(v1: any, v2: any): boolean {
    return Number(v1) === Number(v2);
  }
}
