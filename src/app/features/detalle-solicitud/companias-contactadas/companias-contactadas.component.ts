import { Component, computed, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { ICompania } from '../detalle-interface';

@Component({
  selector: 'app-companias-contactadas',
  templateUrl: './companias-contactadas.component.html',
  styleUrls: ['./companias-contactadas.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
  ]
})
export class CompaniasContactadasComponent implements OnInit {
  panelOpenState = false;

  companias = input.required<ICompania[] | undefined>();
  compFiltradas = computed(()=> this.companias());

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
