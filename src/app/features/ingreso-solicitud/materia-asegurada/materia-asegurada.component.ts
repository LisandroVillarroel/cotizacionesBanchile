import { Component, input, OnInit, signal, inject, effect } from '@angular/core';
import { MateriaService } from '../service/materia.service';
import { IMateria, IMateriaEstructura, IMateriaIngresa, IMateriaResultado } from '../modelo/materia-Interface';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { StorageService } from '@shared/service/storage.service';
import { ISesionInterface } from '@shared/modelo/sesion-interface';


@Component({
  selector: 'app-materia-asegurada',
  standalone: true,
  imports: [NgClass, MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatDialogModule],
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

  datoMateria = signal<IMateria[]>([]);

  datoMateriaEstructura = signal<IMateriaEstructura[]>([])
  datoMateriaEstructura_arr: IMateriaEstructura[] = []

  materiaIngresa: IMateriaIngresa[] = []

  constructor() {
    effect(() => {
      // Llamar al método cada vez que el valor cambie
      this.datoMateriaEstructura_arr = [];
      this.rescataListaAsegurados(this.idRubro(), this.idSeguro());
    });
  }

  materiaForm = signal<FormGroup>(
    new FormGroup({

    }))


  rescataListaAsegurados(idRubro: number, idSeguro: number) {
    console.log('rescataListaAsegurados')
    const estructura_listaMateria = {
      p_id_rubro: 1,
      p_id_tipo_seguro: 1
    };
    console.log('estructura_listaMateria', estructura_listaMateria)
    this.materiaService
      .postListadoMatetria(estructura_listaMateria)
      .subscribe({
        next: (dato: IMateriaResultado) => {
          if (dato.codigo === 200) {
            console.log('dato.p_cursor', dato.p_cursor)
            this.datoMateria.set(dato.p_cursor);
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

  creaEstructura() {/*
      let Arreglo=[{fila:0, columna:0}];
      let cuentaColumnas=0;
      let fila=0
      for (let i = 0; i < this.datoMateria().length; i++) {
          cuentaColumnas=0
          fila=0;
          for (let a = i; a < this.datoMateria().length; a++) {
              if (this.datoMateria()[i].p_id_linea==this.datoMateria()[i].p_id_linea){
                cuentaColumnas++;
                fila=this.datoMateria()[i].p_id_linea;
              }else{
                Arreglo.push({fila:fila, columna:cuentaColumnas})
                i=a;
                exit
              }
      }
              */
    //Cuenta Columnas por fila
    const cuantaColumnas = this.datoMateria().reduce((acumulador, dato) => {
      const linea = dato.p_id_linea;
      acumulador[linea] = (acumulador[linea] || 0) + 1;
      return acumulador;
    }, {} as Record<number, number>); // Se usa una aserción de tipo para el acumulador

    const cuantaColumnasArreglo: [string, number][] = Object.entries(cuantaColumnas);

    console.log('Record:', cuantaColumnas)
    console.log('arreglo:', cuantaColumnasArreglo)

    let valoresFila;
    let valorClass = '';
    let nombreCampo = ''
    let nombreLabel = '';

    console.log('cuantaColumnasArreglo.length', cuantaColumnasArreglo.length)
    for (let a = 0; a < cuantaColumnasArreglo.length; a++) {
      valoresFila = this.datoMateria().filter((valor) => valor.p_id_linea == Number(cuantaColumnasArreglo[a][0]))
      //console.log('valoresFila:',valoresFila)

      for (let b = 0; b < Number(cuantaColumnasArreglo[a][1]); b++) {
        valorClass = 'col-md-' + (12 / (Number(cuantaColumnasArreglo[a][1]))).toString() + ' border';
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
    // console.log('this.datoMateriaEstructura_arr:', this.datoMateriaEstructura_arr)
    this.datoMateriaEstructura.set(this.datoMateriaEstructura_arr);
  }


  agregaFormControl(nombreCampo: string, ValorInicial: any, requerido: boolean): void {
    this.materiaForm().addControl(nombreCampo, new FormControl(''));
  }

  grabarMateria() {
    console.log('this.datoMateriaEstructura()', this.datoMateriaEstructura());

    let nombreCampo = '';

    for (const fila of this.datoMateriaEstructura()) {
      for (const columna of fila.datos) {
        nombreCampo = ''
        if (columna.p_tipo_dato != 'TITULO')
          nombreCampo = this.materiaForm().get(columna.nombreCampo!)!.value
        console.log('nombreCampo:',nombreCampo)
        this.materiaIngresa.push({
          p_id_solicitud: Number(this.idSolicitud()),
          p_id_rubro: columna.p_id_rubro,
          p_id_tipo_seguro: columna.p_id_tipo_seguro,
          p_id_seccion: columna.p_id_seccion,
          p_id_linea: columna.p_id_linea,
          p_id_posicion: columna.p_id_posicion,
          p_tipo_dato: columna.p_tipo_dato,
          p_valor_dato: nombreCampo,
          p_largo_dato: columna.p_largo_dato,
          p_decimales_dato: columna.p_decimales_dato,
          p_id_listapadre: columna.p_id_listapadre,
          p_fecha_creacion: '',
          p_usuario_creacion: this._storage()?.usuarioLogin.usuario!
        })
      }
    }


    console.log('this.materiaIngresa:', this.materiaIngresa)
  }
}
