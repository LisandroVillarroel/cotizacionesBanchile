import { Component, input, OnInit, signal, inject } from '@angular/core';
import { MateriaService } from '../service/materia.service';
import { IMateria, IMateriaResultado } from '../modelo/materia-Interface';

@Component({
  selector: 'app-materia-asegurada',
  standalone: true,
  imports: [],
  templateUrl: './materia-asegurada.component.html',
  styleUrl: './materia-asegurada.component.css',
})
export class MateriaAseguradaComponent implements OnInit {
  idRubro = input.required<number>();
  idSeguro = input.required<number>();

  materiaService=inject(MateriaService);

  datoMateria=signal<IMateria[]>([]);

   async ngOnInit() {

      this.rescataListaAsegurados();
    }

    rescataListaAsegurados() {
      console.log('rescataListaAsegurados')
      const estructura_listaMateria = {
        idRubro: this.idRubro(),
        idSeguro: this.idSeguro()
      };
      this.materiaService
      .postListadoMatetria(estructura_listaMateria)
        .subscribe({
          next: (dato: IMateriaResultado) => {
            if (dato.codigo === 200) {
              this.datoMateria.set(dato.p_cursor);
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
}
