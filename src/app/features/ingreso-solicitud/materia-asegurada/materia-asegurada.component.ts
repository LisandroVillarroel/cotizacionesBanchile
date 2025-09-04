import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-materia-asegurada',
  standalone: true,
  imports: [],
  templateUrl: './materia-asegurada.component.html',
  styleUrl: './materia-asegurada.component.css',
})
export class MateriaAseguradaComponent {
  mensaje = signal('<p>materia-asegurada works!</p>');
}
