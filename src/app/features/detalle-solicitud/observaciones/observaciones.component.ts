import { Component, computed, input, OnInit } from '@angular/core';
import { IObservacion } from '../modelo/detalle-interface';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from "@angular/material/divider";

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule
  ],
})
export class ObservacionesComponent implements OnInit {

  observaciones = input.required<IObservacion[] | undefined>();
  obsFiltradas = computed(()=> this.observaciones());

  constructor() { }

  ngOnInit() {
  }
}
