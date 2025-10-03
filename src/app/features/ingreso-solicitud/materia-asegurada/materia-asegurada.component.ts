import { Component, input, OnInit, signal, inject, effect } from '@angular/core';
import { MateriaService } from '../service/materia.service';
import { IMateria, IMateriaEstructura, IMateriaResultado } from '../modelo/materia-Interface';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-materia-asegurada',
  standalone: true,
  imports: [NgClass,MatFormFieldModule,
      ReactiveFormsModule,
      MatInputModule,],
  templateUrl: './materia-asegurada.component.html',
  styleUrl: './materia-asegurada.component.css',
})
export class MateriaAseguradaComponent {
  idRubro = input.required<number>();
  idSeguro = input.required<number>();

  materiaService = inject(MateriaService);

  datoMateria = signal<IMateria[]>([]);

  datoMateriaEstructura = signal<IMateriaEstructura[]>([])
  datoMateriaEstructura_arr: IMateriaEstructura[] = []

  constructor() {
    effect(() => {
      // Llamar al método cada vez que el valor cambie
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
    let valorClass='';
    let nombreCampo=''
    let nombreLabel='';

    for (let a = 0; a < cuantaColumnasArreglo.length; a++) {
      valoresFila = this.datoMateria().filter((valor) => valor.p_id_linea == Number(cuantaColumnasArreglo[a][0]))
console.log('valoresFila:',valoresFila)

      for (let b = 0; b<Number(cuantaColumnasArreglo[a][1]); b++){
        valorClass='col-md-'+(12/(Number(cuantaColumnasArreglo[a][1]))).toString();
        if(valoresFila[b].p_tipo_dato=='TITULO'){
          if(Number(cuantaColumnasArreglo[a][1])>1){
            valorClass=valorClass+' subTitulo'
          }else{
             valorClass=valorClass+' titulo'
          }
          nombreLabel=valoresFila[b].p_valor_dato;
        }else{ //Si es campo
          nombreCampo=valoresFila[b].p_id_rubro+'_'+valoresFila[b].p_id_tipo_seguro+'_'+valoresFila[b].p_id_seccion+'_'+valoresFila[b].p_id_linea+'_'+valoresFila[b].p_id_posicion
          this.agregaFormControl(nombreCampo,valoresFila[b].p_valor_dato,false)
        }
        valoresFila[b].estiloClass=valorClass
        valoresFila[b].nombreCampo=nombreCampo
        valoresFila[b].nombreLabel=nombreLabel
      }

      this.datoMateriaEstructura_arr.push({
        filas: Number(cuantaColumnasArreglo[a][0]),
        columnas: Number(cuantaColumnasArreglo[a][1]),
        datos: valoresFila
      })
      console.log('valor fila:', Number(cuantaColumnasArreglo[a][0]), '-', valoresFila)
    }
    console.log('this.datoMateriaEstructura_arr:', this.datoMateriaEstructura_arr)
    this.datoMateriaEstructura.set(this.datoMateriaEstructura_arr);
  }


  agregaFormControl(nombreCampo:string,ValorInicial:any,requerido:boolean): void {
  this.materiaForm().addControl(nombreCampo, new FormControl(''));
}
}
