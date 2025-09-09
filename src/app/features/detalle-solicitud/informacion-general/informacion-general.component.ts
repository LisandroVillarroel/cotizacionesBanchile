import { Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardContent } from "@angular/material/card";

@Component({
  selector: 'app-informacion-general',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardContent],
  templateUrl: './informacion-general.component.html',
  styleUrl: './informacion-general.component.css'
})
export class InformacionGeneralComponent {

}
