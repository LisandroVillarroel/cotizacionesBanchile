import { Component, computed, input, OnInit } from '@angular/core';
import { IObservacion } from '../detalle-interface';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from "@angular/material/divider";
import {MatExpansionModule} from '@angular/material/expansion';


@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
],
})
export class ObservacionesComponent implements OnInit {
  panelOpenState = false;

  observaciones = input.required<IObservacion[] | undefined>();
  obsFiltradas = computed(()=> this.observaciones());

  constructor() { }

  ngOnInit() {
  }

}
