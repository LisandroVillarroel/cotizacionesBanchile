import { Component, input, OnInit, signal, inject, effect } from '@angular/core';
import { MateriaService } from '../service/materia.service';
import { IMateria, IMateriaResultado } from '../modelo/materia-Interface';

@Component({
  selector: 'app-materia-asegurada',
  standalone: true,
  imports: [],
  templateUrl: './materia-asegurada.component.html',
  styleUrl: './materia-asegurada.component.css',
})
export class MateriaAseguradaComponent {
  idRubro = input.required<number>();
  idSeguro = input.required<number>();

  materiaService = inject(MateriaService);

  datoMateria = signal<IMateria[]>([]);

  constructor() {
    effect(() => {
      // Llamar al método cada vez que el valor cambie
      this.rescataListaAsegurados(this.idRubro(), this.idSeguro());
    });
  }



  rescataListaAsegurados(idRubro: number, idSeguro: number) {
    console.log('rescataListaAsegurados')
    const estructura_listaMateria = {
      p_id_rubro: idRubro,
      p_id_tipo_seguro: idSeguro
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

    console.log('Record:',cuantaColumnas)
    console.log('arreglo:',cuantaColumnasArreglo)

    let valoresFila
    for (let a=0; a<cuantaColumnasArreglo.length; a++){
        valoresFila=this.datoMateria().filter((valor)=> valor.p_id_linea==Number(cuantaColumnasArreglo[a][0]))
        console.log('valor fila:',Number(cuantaColumnasArreglo[a][0]),'-',valoresFila)
      }

  }
}
