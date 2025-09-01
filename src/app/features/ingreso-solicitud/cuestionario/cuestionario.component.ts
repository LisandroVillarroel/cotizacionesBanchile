import {
  Component,
  signal,
  ViewChildren,
  ElementRef,
  QueryList,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cuestionario-documentos',
  standalone: true,
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatStepperModule,
    NgFor,
    NgIf,
  ],
})
export class CuestionarioComponent {
  documentForm = signal(this.fb.group({}));

  documentos = [
    {
      nombre: 'Cuestionario de cotización',
      obligatorio: true,
      archivo: signal(''),
      get archivoNombre() {
        return this.archivo();
      },
    },
    {
      nombre: 'Carta Gantt',
      obligatorio: false,
      archivo: signal(''),
      get archivoNombre() {
        return this.archivo();
      },
    },
    {
      nombre: 'Descripción de la obra',
      obligatorio: false,
      archivo: signal(''),
      get archivoNombre() {
        return this.archivo();
      },
    },
    {
      nombre: 'Medidas de seguridad',
      obligatorio: false,
      archivo: signal(''),
      get archivoNombre() {
        return this.archivo();
      },
    },
    {
      nombre: 'Plano/Layout de la obra',
      obligatorio: false,
      archivo: signal(''),
      get archivoNombre() {
        return this.archivo();
      },
    },
    {
      nombre: 'Presupuesto',
      obligatorio: false,
      archivo: signal(''),
      get archivoNombre() {
        return this.archivo();
      },
    },
    {
      nombre: 'Documentos adicionales',
      obligatorio: false,
      archivo: signal(''),
      get archivoNombre() {
        return this.archivo();
      },
    },
  ];

  @ViewChildren('fileInputs') fileInputs!: QueryList<
    ElementRef<HTMLInputElement>
  >;

  constructor(private fb: FormBuilder) {}

  abrirInputArchivo(nombre: string) {
    const input = this.fileInputs.find(
      (ref) => ref.nativeElement.id === 'fileInput_' + nombre
    );
    input?.nativeElement.click();
  }

  onFileSelected(event: Event, doc: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      doc.archivo = file.name;
    }
  }

  eliminarDocumento(doc: any) {
    doc.archivo = '';
  }

  guardarSolicitud() {
    console.log('Solicitud guardada con los siguientes documentos:');
    this.documentos.forEach((doc) => {
      console.log(`${doc.nombre}: ${doc.archivo() || 'No cargado'}`);
    });
  }
}
