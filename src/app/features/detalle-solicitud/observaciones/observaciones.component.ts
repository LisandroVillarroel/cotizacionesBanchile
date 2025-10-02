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
    // MatTableModule,
    // MatPaginatorModule,
    // MatIconModule,
    // MatSortModule,
    // MatDialogModule,
    // MatFormFieldModule,
    // MatButtonModule,
    // ReactiveFormsModule,
    // MatSelectModule,
    // MatDatepickerModule,
    // MatTooltipModule,
    // MatExpansionModule,
    // MatDividerModule,
    // MatTabsModule,
    MatCardModule,
    // MatGridListModule,
    // FormsModule,
    // CommonModule,
    // MatButtonModule,
    // MatDialogModule,
    // MatIcon,
    // MatToolbarModule,
    // MatIconModule,
    // MatTooltipModule,
    // MatTabsModule,
    MatDividerModule,
    MatExpansionModule,
],
})
export class ObservacionesComponent implements OnInit {
  panelOpenState = false;

  observaciones = input.required<IObservacion[] | undefined>();
  obsFiltradas = computed(()=> this.observaciones());

  isEmpty(value: any): boolean {
    console.log("valor", value);
    console.log("indefinido ", value === undefined);
    console.log("vacío ", value === null);
    return value === undefined || value === null;
  }
  constructor() { }

  ngOnInit() {
  }

}
